const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    industry: String,
    stage: String,
    location: String,
    teamSize: Number,
    fundingGoal: String,
    website: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Startup', startupSchema);
