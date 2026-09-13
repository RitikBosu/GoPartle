const express = require("express");
const router = express.Router();
const Requirement = require("../models/Requirement");
const PlannerRequirement = require("../models/PlannerRequirement");
const PerformerRequirement = require("../models/PerformerRequirement");
const CrewRequirement = require("../models/CrewRequirement");

// ── POST /api/requirements ──────────────────────────────────────────────────
// Create a new requirement posting (saves to master requirements + category collection)
router.post("/", async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      startDate,
      endDate,
      location,
      venue,
      category,
      plannerDetails,
      performerDetails,
      crewDetails,
    } = req.body;

    const payload = {
      eventName,
      eventType,
      startDate,
      endDate: endDate || null,
      location,
      venue: venue || "",
      category,
      plannerDetails: category === "planner" ? plannerDetails : null,
      performerDetails: category === "performer" ? performerDetails : null,
      crewDetails: category === "crew" ? crewDetails : null,
    };

    // Save to master 'requirements' collection
    const requirement = new Requirement(payload);
    await requirement.save();

    // Save to category-specific collection ('planners', 'performers', or 'crews')
    if (category === "planner" && plannerDetails) {
      await new PlannerRequirement({
        _id: requirement._id,
        eventName, eventType, startDate, endDate: endDate || null, location, venue: venue || "",
        plannerDetails,
      }).save();
    } else if (category === "performer" && performerDetails) {
      await new PerformerRequirement({
        _id: requirement._id,
        eventName, eventType, startDate, endDate: endDate || null, location, venue: venue || "",
        performerDetails,
      }).save();
    } else if (category === "crew" && crewDetails) {
      await new CrewRequirement({
        _id: requirement._id,
        eventName, eventType, startDate, endDate: endDate || null, location, venue: venue || "",
        crewDetails,
      }).save();
    }

    res.status(201).json({
      success: true,
      message: "Requirement posted successfully",
      data: requirement,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/requirements ───────────────────────────────────────────────────
// List all requirements (newest first)
router.get("/", async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: requirements.length, data: requirements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/requirements/:id ───────────────────────────────────────────────
// Get a single requirement by ID
router.get("/:id", async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) {
      return res
        .status(404)
        .json({ success: false, message: "Requirement not found" });
    }
    res.json({ success: true, data: requirement });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
