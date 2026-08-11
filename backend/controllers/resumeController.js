const Resume = require('../models/Resume');
const crypto = require('crypto');

// Create Resume
const createResume = async (req, res) => {
  try {
    const resumeData = { ...req.body, userId: req.user.id };
    const resume = new Resume(resumeData);
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all resumes
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single resume
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Resume
const updateResume = async (req, res) => {
  try {
    const { isPublic } = req.body;
    const updateData = { ...req.body };
    
    if (isPublic) {
      updateData.shareLink = crypto.randomBytes(16).toString('hex');
    } else {
      updateData.shareLink = '';
    }
    
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true }
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Public Resume (No Auth Required)
const getPublicResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ shareLink: req.params.shareLink, isPublic: true });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not public' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createResume, getResumes, getResumeById, updateResume, deleteResume, getPublicResume };