const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/paritypath');
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    // Don't exit — app can still work without DB for AI features
    console.log('⚠️  Running without database. AI features will work, but data won\'t persist.');
  }
};

module.exports = connectDB;
