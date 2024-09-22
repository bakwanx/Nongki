const { Sequelize } = require('sequelize');
require('dotenv').config();
const envConfigs =  require('../config/config.js');
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
