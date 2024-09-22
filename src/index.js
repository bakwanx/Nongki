const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
const routes = require('./routes/routes');
const { connectDB } = require('./config/database');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize database connection
connectDB();

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});