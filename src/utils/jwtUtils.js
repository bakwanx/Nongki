const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isTokenValid = await authService.isTokenInRedis(decoded.id);

    if (!isTokenValid) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateJWT };
