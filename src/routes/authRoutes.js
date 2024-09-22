const express = require('express');
const router = express.Router();
const { login, register, logout, test } = require('../usecases/authUseCases');
const { authenticateJWT } = require('../utils/jwtUtils');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateJWT, logout);

// Test
router.get('/test', authenticateJWT, test);

module.exports = router;
