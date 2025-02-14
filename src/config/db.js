const mongoose = require('mongoose');
const config = require('./index');
const initializePlans = require('../services/plan.service').initializePlans;
const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUrl, {});
    await initializePlans();
    console.log('✅ Plans initialized successfully');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;
