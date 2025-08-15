const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, googleCallback } = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    googleCallback
);

// @route   GET /api/auth/me
// @access  Private
const { protect } = require('../middleware/authMiddleware');
router.get('/me', protect, (req, res) => {
    if (!req.user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
        success: true,
        data: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            createdAt: req.user.createdAt
        }
    });
});

module.exports = router;

/*
Testing with Postman:

1. Register:
POST http://localhost:5000/api/auth/register
Headers: {
  "Content-Type": "application/json"
}
Body: {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "Startup Owner"
}

2. Login:
POST http://localhost:5000/api/auth/login
Headers: {
  "Content-Type": "application/json"
}
Body: {
  "email": "test@example.com",
  "password": "password123"
}

3. Google OAuth:
GET http://localhost:5000/api/auth/google
(Use browser for OAuth flow)
*/
