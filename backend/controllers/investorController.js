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
