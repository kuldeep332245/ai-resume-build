const Admin = require('../models/Admin');
const User = require('../models/User');
const Resume = require('../models/Resume');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const activeUsers = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) } });
    res.json({ totalUsers, totalResumes, activeUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { adminLogin, getDashboardStats, getAllUsers, deleteUser };