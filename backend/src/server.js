require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const requirementsRouter = require("./routes/requirements");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Serverless DB Connection Manager ──────────────────────────────────────────
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

// Ensure DB is connected on every request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ── Root Health Check (Matches /, /api, /api/index) ──────────────────────────
app.get(["/", "/api", "/api/index", "/api/index.js"], (req, res) => {
  res.json({ status: "ok", message: "GoPratle API is running 🎉" });
});

// ── Requirements Router (Matches both /api/requirements and /requirements) ───
app.use(["/api/requirements", "/requirements"], requirementsRouter);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Local Dev Server Listen ───────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production" || require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 GoPratle API listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
