require('dotenv').config();

module.exports = {
  development: {
    username: String(process.env.DB_USER || 'postgres'),
    password: String(process.env.DB_PASSWORD || '12345'),
    database: String(process.env.DB_NAME || 'test'),
    host: String(process.env.DB_HOST || '127.0.0.1'),
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};