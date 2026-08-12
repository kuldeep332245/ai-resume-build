const { cacheMiddleware, clearCache } = require('../middleware/cache');
const express = require('express');
const { createResume, getResumes, getResumeById, deleteResume, updateResume, getPublicResume } = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createResume);
router.get('/all', authMiddleware, cacheMiddleware(300), getResumes);
router.get('/:id', authMiddleware, cacheMiddleware(300), getResumeById);
router.delete('/:id', authMiddleware, deleteResume);
router.put('/:id', authMiddleware, updateResume); 
router.get('/public/:shareLink', cacheMiddleware(300), getPublicResume);

module.exports = router;