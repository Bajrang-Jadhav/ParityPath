const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  displayName: { type: String, default: 'Anonymous' },
  role: { type: String, enum: ['employer', 'candidate', 'admin'], default: 'candidate' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
