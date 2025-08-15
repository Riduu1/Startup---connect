const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createInvestor, getInvestors } = require('../controllers/investorController');

const router = express.Router();

// Create investor (protected)
router.post('/', protect, createInvestor);
// Get all investors (public)
router.get('/', getInvestors);

module.exports = router;
