const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    attendees: { type: Number, default: 0 },
    maxAttendees: { type: Number, required: true },
    price: { type: String, required: true }
});

module.exports = mongoose.model("Event", eventSchema);
