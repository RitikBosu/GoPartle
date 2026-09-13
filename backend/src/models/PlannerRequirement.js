const mongoose = require("mongoose");

const plannerRequirementSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true, default: "" },
    category: { type: String, default: "planner" },
    plannerDetails: {
      servicesNeeded: [String],
      budgetRange: { min: Number, max: Number },
      guestCount: Number,
      preferredExperienceLevel: String,
      specialRequirements: String,
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlannerRequirement", plannerRequirementSchema, "planners");
