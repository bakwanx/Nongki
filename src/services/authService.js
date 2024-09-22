const jwt = require('jsonwebtoken');
const redisService = require('./redisService');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const saveTokenInRedis = async (userId, token) => {
  await redisService.set(userId, token, 3600); 
};

const removeTokenFromRedis = async (userId) => {
  await redisService.del(userId);
};

const isTokenInRedis = async (userId) => {
  const token = await redisService.get(userId);
  return token !== null;
};

module.exports = { generateToken, saveTokenInRedis, removeTokenFromRedis, isTokenInRedis };
