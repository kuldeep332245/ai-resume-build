const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    summary: String,
  },
  education: [{
    degree: String,
    institution: String,
    year: String,
    grade: String,
  }],
  experience: [{
    jobTitle: String,
    company: String,
    years: String,
    description: String,
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    techStack: String,
    link: String,
  }],
  certifications: [{
  name: String,
  organization: String,
  date: String,
  link: String,
}],
  languages: [{
  name: String,
  proficiency: String,
}],
  template: { type: String, default: 'modern' },
  shareLink: { type: String, default: '' },
isPublic: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);