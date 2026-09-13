const mongoose = require("mongoose");

const performerRequirementSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true, default: "" },
    category: { type: String, default: "performer" },
    performerDetails: {
      performerType: String,
      genreStyle: [String],
      setDurationMinutes: Number,
      equipmentProvidedByVenue: Boolean,
      performanceDetails: String,
      budget: Number,
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PerformerRequirement", performerRequirementSchema, "performers");
