const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password required only if not Google login
        }
    },
    role: {
        type: String,
        required: true,
        enum: ['Startup Owner', 'Investor']
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Method to compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

/*
Testing with Postman:
1. Create a new user:
POST /api/auth/register
Body: {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "Startup Owner"
}

2. Verify in MongoDB that:
- Password is hashed
- createdAt timestamp is set
- All fields are properly saved
*/
