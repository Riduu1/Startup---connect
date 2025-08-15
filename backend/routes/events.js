const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Event = require("../models/Event");

// Create new event
router.post("/", protect, async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            attendees: 0 // default attendees
        });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
