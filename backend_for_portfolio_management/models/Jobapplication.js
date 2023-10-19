const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resumeLink: {
    type: String,
  },
  salaryExpectation: {
    type: String,
  },
  yearsOfExperience: {
    type: String,
  },
  category: {
    type: String, // Define the category field
  },
  educationLevel: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
