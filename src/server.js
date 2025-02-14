require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../src/config/db');
const config = require('./config/index');
const routes = require('./loaders/routes');

const PORT = config.port || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
