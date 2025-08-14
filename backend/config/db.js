const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the MONGODB_URI from environment variables
 * Implements retry logic and proper error handling
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

/* 
Testing:
1. Ensure MongoDB is running locally or you have a valid MongoDB Atlas URI
2. Set MONGODB_URI in .env file
3. Run the server and check console for successful connection message
*/
