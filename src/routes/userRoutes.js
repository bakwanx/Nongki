const express = require('express');
const router = express.Router();
const { 
    updateUserProfile, 
    updateEmailAndPassword, 
    getUser, 
    removeUser
} = require('../usecases/userUseCases');
const { authenticateJWT } = require('../utils/jwtUtils');

router.patch('/user-profile', authenticateJWT, updateUserProfile);
router.patch('/email-password', authenticateJWT, updateEmailAndPassword);
router.get('/user', authenticateJWT, getUser);
router.delete('/user', authenticateJWT, removeUser);

module.exports = router;