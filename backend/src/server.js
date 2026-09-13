require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const requirementsRouter = require("./routes/requirements");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Global CORS Middleware (Applies to all requests & responses) ──────────────
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Serverless DB Connection Manager ──────────────────────────────────────────
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables!");
  }
  const db = await mongoose.connect(uri);
  isConnected = db.connections[0].readyState === 1;
  console.log("✅ Connected to MongoDB Atlas");
}

// DB Connection middleware with error catching
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed. Please check MONGODB_URI in Vercel environment variables.",
      error: err.message,
    });
  }
});

// ── Root Health Check ────────────────────────────────────────────────────────
app.get(["/", "/api", "/api/index", "/api/index.js"], (req, res) => {
  res.json({ status: "ok", message: "GoPratle API is running 🎉" });
});

// ── Requirements Router ──────────────────────────────────────────────────────
app.use(["/api/requirements", "/requirements"], requirementsRouter);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error", error: err.message });
});

// ── Local Dev Server Listen ───────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production" || require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 GoPratle API listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
