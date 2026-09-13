const mongoose = require("mongoose");

// ── Planner sub-schema ──────────────────────────────────────────────────────
const plannerSchema = new mongoose.Schema(
  {
    servicesNeeded: {
      type: [String],
      enum: [
        "Décor",
        "Catering",
        "Photography",
        "Videography",
        "Sound & Lighting",
        "Transportation",
        "Invitations & Stationery",
        "Floral Arrangements",
        "Entertainment",
        "Other",
      ],
      default: [],
    },
    budgetRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    guestCount: { type: Number, min: 1 },
    preferredExperienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior", "Expert"],
    },
    specialRequirements: { type: String, default: "" },
  },
  { _id: false }
);

// ── Performer sub-schema ────────────────────────────────────────────────────
const performerSchema = new mongoose.Schema(
  {
    performerType: {
      type: String,
      enum: ["DJ", "Band", "Singer", "Dancer", "Comedian", "Magician", "Other"],
    },
    genreStyle: { type: [String], default: [] },
    setDurationMinutes: { type: Number, min: 1 },
    equipmentProvidedByVenue: { type: Boolean, default: false },
    performanceDetails: { type: String, default: "" },
    budget: { type: Number, min: 0 },
  },
  { _id: false }
);

// ── Crew sub-schema ─────────────────────────────────────────────────────────
const crewSchema = new mongoose.Schema(
  {
    crewTypesNeeded: {
      type: [String],
      enum: [
        "Stage Crew",
        "Lighting",
        "Sound",
        "Security",
        "Ushers",
        "Photographers",
        "Videographers",
        "Backstage Support",
        "Other",
      ],
      default: [],
    },
    numberOfCrewMembers: { type: Number, min: 1 },
    hoursRequired: { type: Number, min: 1 },
    specialSkills: { type: String, default: "" },
    budgetPerPerson: { type: Number, min: 0 },
  },
  { _id: false }
);

// ── Root Requirement schema ─────────────────────────────────────────────────
const requirementSchema = new mongoose.Schema(
  {
    // Step 1 – Event Basics
    eventName: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      required: true,
      enum: [
        "Wedding",
        "Corporate Event",
        "Concert",
        "Festival",
        "Birthday Party",
        "Conference",
        "Product Launch",
        "Sports Event",
        "Other",
      ],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["planner", "performer", "crew"],
    },

    // Step 2/3 – Category-specific details (one populated based on category)
    plannerDetails: { type: plannerSchema, default: null },
    performerDetails: { type: performerSchema, default: null },
    crewDetails: { type: crewSchema, default: null },

    // Meta
    status: {
      type: String,
      enum: ["pending", "active", "closed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requirement", requirementSchema);
