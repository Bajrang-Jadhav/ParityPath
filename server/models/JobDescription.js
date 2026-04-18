const mongoose = require('mongoose');

const biasItemSchema = new mongoose.Schema({
  original: String,
  reason: String,
  suggestion: String,
}, { _id: false });

const jobDescriptionSchema = new mongoose.Schema({
  originalText: { type: String, required: true },
  rewrittenText: String,
  simplifiedText: String,
  parityScore: { type: Number, min: 0, max: 1 },
  scoreExplanation: String,
  biasedItems: [biasItemSchema],
  extractedSkills: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('JobDescription', jobDescriptionSchema);
