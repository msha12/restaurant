const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
}

module.exports = connectDb;