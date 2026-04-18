const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: String,
  org: String,
  duration: String,
  bullets: [String],
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  impact: String,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String,
}, { _id: false });

const candidateProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Candidate' },
  rawTranscript: { type: String, required: true },
  summary: String,
  skills: [String],
  experience: [experienceSchema],
  projects: [projectSchema],
  education: [educationSchema],
}, { timestamps: true });

module.exports = mongoose.model('CandidateProfile', candidateProfileSchema);
