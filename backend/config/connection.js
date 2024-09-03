const mongoose = require('mongoose');

async function connectDB(url) {
    try {
        await mongoose.connect(url, {
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
