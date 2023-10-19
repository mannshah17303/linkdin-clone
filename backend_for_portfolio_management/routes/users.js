const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Require the Mongoose model

// Define a route to get user data by ID
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);



  try {
    // Use the Mongoose model to find the user by ID
    const user = await User.findById(userId).populate('connections.pending connections.connections');

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Implement error handling for database or other errors
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

module.exports = router;
