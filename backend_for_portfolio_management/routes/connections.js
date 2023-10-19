const express = require('express');
const router = express.Router();
const authMiddleware = require('./auth'); // Import the authMiddleware
const User = require('../models/User'); // Import the User model


// Send a connection request
router.post('/send-request/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const requesterUserId = req.body.userId;

    // Find the authenticated user and the target user
    const currentUser = await User.findById(requesterUserId);
    const targetUser = await User.findById(userId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the target user to the current user's connections
    currentUser.connections.connections.push(targetUser._id);

    // Add the current user to the target user's connections
    targetUser.connections.connections.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ message: 'Connection established' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});






  

module.exports = router;
