const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = async (req, res) => {
    try {
        // Get user information from Google profile
        const { id, displayName, emails } = req.user;

        // Check if user exists
        let user = await User.findOne({ googleId: id });

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                name: displayName,
                email: emails[0].value,
                googleId: id,
                role: 'Startup Owner' // Default role, can be updated later
            });
        }

        // Generate token
        const token = generateToken(user._id);

        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${token}`);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error during Google authentication',
            error: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleCallback
};

/*
Testing with Postman:

1. Register User:
POST /api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Startup Owner"
}

2. Login User:
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}

3. Google OAuth:
GET /api/auth/google
(This will redirect to Google login)

Note: For Google OAuth testing, use a web browser as Postman doesn't handle OAuth redirects well.
*/
