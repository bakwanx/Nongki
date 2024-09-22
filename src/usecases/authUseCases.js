const bcrypt = require('bcryptjs');
const userService = require('../services/userService');
const authService = require('../services/authService');

const register = async (req, res) => {
  const { email, password, fullname, address, gender, maritalStatus  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser({ email, password: hashedPassword });
    const userProfile = await userService.createUserProfile({ user:user,fullname, address, gender, maritalStatus });
    res.status(201).json({ message: 'User created successfully',  userProfile});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUser(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = authService.generateToken(user);
    
    await authService.saveTokenInRedis(user.id, token);
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  const userId = req.user.id;
  try {
    await authService.removeTokenFromRedis(userId);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
};

const test = async (req, res) => {
  res.status(200).json({ message: 'Hallooo' });
}

module.exports = { register, login, logout, test };
