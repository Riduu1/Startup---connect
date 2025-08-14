require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // Create new user if doesn't exist
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: 'Startup Owner' // Default role
                });
            }

            return done(null, profile);
        } catch (error) {
            return done(error, null);
        }
    }
));

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Startup-Connect API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*
Testing the Server:

1. Install dependencies:
npm install express mongoose dotenv cors passport passport-google-oauth20 jsonwebtoken bcryptjs

2. Create .env file with:
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
PORT=5000

3. Start server:
node server.js

4. Test basic route:
GET http://localhost:5000/
Expected: { "message": "Welcome to Startup-Connect API" }

5. Test authentication routes as described in authRoutes.js
*/
