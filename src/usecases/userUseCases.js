const bcrypt = require('bcryptjs');
const userService = require('../services/userService');
const authService = require('../services/authService');

const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { fullname, address, gender, maritalStatus  } = req.body;
    try {
        await userService.updateUserProfile({ userId, fullname, address, gender, maritalStatus });
        res.status(201).json({ message: 'User updated successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmailAndPassword = async (req, res) => {
    const userId = req.user.id;
    const { email, password  } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userService.updateEmailAndPassword({ userId, email, password: hashedPassword });
      res.status(201).json({ message: 'Email and Password updated successfully'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
      const userProfile = await userService.getUser(userId);
      res.status(201).json({ message: 'Success get data', userProfile});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const removeUser = async (req, res) => {
    const userId = req.user.id;
    try {
      const userProfile = await userService.removeUser(userId);
      res.status(201).json({ message: 'Success delete user', userProfile});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    updateUserProfile, 
    updateEmailAndPassword,
    getUser,
    removeUser
}