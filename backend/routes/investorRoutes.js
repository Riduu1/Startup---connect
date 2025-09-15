const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createInvestor, getInvestors, submitPitch, getMyPitches } = require('../controllers/investorController');
const Investor = require('../models/Investor');

const router = express.Router();

// Create investor (protected)
router.post('/', protect, createInvestor);
// Get all investors (public)
router.get('/', getInvestors);

// Submit a pitch to an investor (must be logged in)
router.post('/:id/pitch', protect, submitPitch);

// Get pitches for the logged-in investor
router.get('/me/pitches', protect, getMyPitches);

// Delete investor profile (protected)
router.delete('/:id', protect, async (req, res) => {
    try {
        const investor = await Investor.findById(req.params.id);
        if (!investor) {
            return res.status(404).json({ success: false, message: "Investor profile not found" });
        }

        // Check if user owns this profile
        if (investor.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this profile" });
        }

        await investor.deleteOne();
        res.json({ success: true, message: "Investor profile deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
