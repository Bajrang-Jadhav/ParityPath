const mongoose = require('mongoose');

const skillMatchSchema = new mongoose.Schema({
  job_req: String,
  candidate_skill: String,
  confidence: Number,
  explanation: String,
}, { _id: false });

const matchResultSchema = new mongoose.Schema({
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDescription' },
  candidateProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'CandidateProfile' },
  matchScore: { type: Number, min: 0, max: 100 },
  overallReasoning: String,
  skillMatches: [skillMatchSchema],
  gaps: [String],
  growthPotential: String,
}, { timestamps: true });

module.exports = mongoose.model('MatchResult', matchResultSchema);
