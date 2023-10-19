const express = require('express');
const router = express.Router();
const authMiddleware = require('./auth'); // Import the authMiddleware
const User = require('../models/User'); // Import the User model

// Add a new skill to the authenticated user's profile
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { skillName } = req.body;

    // Find the authenticated user
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the skill to the user's profile
    user.profile.skills.push(skillName);
    await user.save();

    res.status(201).json({ message: 'Skill added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove a skill from the authenticated user's profile
router.delete('/remove/:skillName', authMiddleware, async (req, res) => {
    try {
      const { skillName } = req.params;
  
      // Find the authenticated user
      const user = await User.findById(req.user.userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove the skill from the user's profile
      user.profile.skills = user.profile.skills.filter(skill => skill !== skillName);
      await user.save();
  
      res.status(200).json({ message: 'Skill removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
