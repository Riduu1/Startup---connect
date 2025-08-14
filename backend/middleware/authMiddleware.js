const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes that require authentication
 * Verifies JWT token from Authorization header
 */
const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

module.exports = { protect };

/*
Testing with Postman:
1. Try accessing a protected route without token:
GET /api/protected-route
Expected: 401 Unauthorized

2. Login and get token
POST /api/auth/login

3. Try protected route with token:
GET /api/protected-route
Headers: {
  Authorization: "Bearer YOUR_TOKEN"
}
Expected: 200 OK
*/
