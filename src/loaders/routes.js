// routes/index.js
const express = require('express');
const router = express.Router();

// Import routes
const auth = require('../routes/auth.routes');
const magazine = require('../routes/magazine.routes');
const subscription = require('../routes/subscription.routes');

// Define routes
router.use('/api/auth', auth);
router.use('/api/magazine', magazine);
router.use('/api/subscription', subscription);
module.exports = router;
