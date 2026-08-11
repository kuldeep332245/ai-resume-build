const express = require('express');
const { adminLogin, getDashboardStats, getAllUsers, deleteUser } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', adminLogin);
router.get('/dashboard', authMiddleware, getDashboardStats);
router.get('/users', authMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;