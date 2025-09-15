const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createStartup, getStartups } = require('../controllers/startupController');
const Startup = require('../models/Startup');

const router = express.Router();

// Create startup (protected)
router.post('/', protect, createStartup);
// Get all startups (public)
router.get('/', getStartups);

// Delete startup (protected)
router.delete('/:id', protect, async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);
        if (!startup) {
            return res.status(404).json({ success: false, message: "Startup not found" });
        }

        // Check if user owns this startup
        if (startup.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this startup" });
        }

        await startup.deleteOne();
        res.json({ success: true, message: "Startup deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
