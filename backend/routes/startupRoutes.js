const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createStartup, getStartups } = require('../controllers/startupController');

const router = express.Router();

// Create startup (protected)
router.post('/', protect, createStartup);
// Get all startups (public)
router.get('/', getStartups);

module.exports = router;
