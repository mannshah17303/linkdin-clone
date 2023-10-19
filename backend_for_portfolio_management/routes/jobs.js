const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose library

const Jobapplication = require('../models/Jobapplication'); // Import your JobApplication model

// Handle job applications
router.post('/apply', async (req, res) => {
  try {
    const {
      companyName,
      name,
      email,
      resumeLink,
      salaryExpectation,
      yearsOfExperience,
      category,
      educationLevel,
      // Include other fields as needed
    } = req.body;



    // Create a new job application document
    const jobapplication = new Jobapplication({
      companyName,
      name,
      email,
      resumeLink,
      salaryExpectation,
      yearsOfExperience,
      category,
      educationLevel,
      // Set other fields here based on your schema
    });

    // Save the job application to the database
    await jobapplication.save();

    // Respond with a success message or other relevant data
    res.status(201).json({ message: 'Job application submitted successfully' });
  } catch (error) {
    console.error('Error submitting job application:', error);
    res.status(500).json({ error: 'An error occurred while submitting the application' });
  }
});

// Add other job-related routes here

module.exports = router;
