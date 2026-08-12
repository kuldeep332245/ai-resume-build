const express = require('express');
const { getAISuggestions } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/suggestions', authMiddleware, getAISuggestions);

module.exports = router;