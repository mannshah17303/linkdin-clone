const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  // Define fields for your job listing model
  title: String,
  description: String,
  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
