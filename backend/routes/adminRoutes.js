const express = require('express');
const { adminLogin, getDashboardStats, getAllUsers, deleteUser } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/login', adminLogin);
router.get('/dashboard', authMiddleware, adminMiddleware, getDashboardStats);
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;