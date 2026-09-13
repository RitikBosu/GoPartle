const mongoose = require("mongoose");

const crewRequirementSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true, default: "" },
    category: { type: String, default: "crew" },
    crewDetails: {
      crewTypesNeeded: [String],
      numberOfCrewMembers: Number,
      hoursRequired: Number,
      specialSkills: String,
      budgetPerPerson: Number,
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CrewRequirement", crewRequirementSchema, "crews");
