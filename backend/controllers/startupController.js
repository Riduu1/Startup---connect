const Startup = require('../models/Startup');

// Create a new startup (protected)
exports.createStartup = async (req, res) => {
    try {
        const startup = await Startup.create({
            owner: req.user._id,
            ...req.body
        });
        res.status(201).json({ success: true, data: startup });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get all startups (public)
exports.getStartups = async (req, res) => {
    try {
        const startups = await Startup.find().populate('owner', 'name email');
        res.json({ success: true, data: startups });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
