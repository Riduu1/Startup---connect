const Investor = require('../models/Investor');

// Create a new investor (protected)
exports.createInvestor = async (req, res) => {
    try {
        const investor = await Investor.create({
            user: req.user._id,
            ...req.body
        });
        res.status(201).json({ success: true, data: investor });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get all investors (public)
exports.getInvestors = async (req, res) => {
    try {
        const investors = await Investor.find().populate('user', 'name email');
        res.json({ success: true, data: investors });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Submit a pitch to an investor
exports.submitPitch = async (req, res) => {
    try {
        const investor = await Investor.findById(req.params.id);
        if (!investor) {
            return res.status(404).json({ success: false, message: "Investor not found" });
        }
        const pitch = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            user: req.user ? req.user._id : undefined
        };
        investor.pitches.push(pitch);
        await investor.save();
        res.json({ success: true, message: "Pitch submitted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get pitches for the logged-in investor
exports.getMyPitches = async (req, res) => {
    try {
        const investor = await Investor.findOne({ user: req.user._id });
        if (!investor) {
            return res.status(404).json({ success: false, message: "Investor profile not found" });
        }
        res.json({ success: true, data: investor.pitches });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
