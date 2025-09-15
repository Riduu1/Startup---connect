const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    bio: String,
    type: String,
    location: String,
    industries: [String],
    investmentRange: String,
    portfolio: Number,
    pitches: [
        {
            name: String,
            email: String,
            message: String,
            submittedAt: { type: Date, default: Date.now },
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investor', investorSchema);
