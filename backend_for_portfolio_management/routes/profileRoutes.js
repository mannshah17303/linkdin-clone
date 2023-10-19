const express = require("express");
const router = express.Router();
const authMiddleware = require("./auth"); // Import authentication middleware
const User = require("../models/User"); // Import the User model
const Profile = require("../models/Profile");

router.post("/profiles", async (req, res) => {
  try {
    const { userId } = req;
    const { firstName, selectedImage } = req.body;
    const profile = new Profile({
      name: firstName, // Use the correct property name
      PhotoImg: selectedImage, // Use the correct property name
      createdAt: new Date(),
      user: userId,
    });
    await profile.save();

    // Update the User document to link to the profile
    const updatedUser = await User.findByIdAndUpdate(userId, { profile: profile._id }, { new: true });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// const multer = require('multer');

// // Configure multer for image uploads
// const storage = multer.memoryStorage(); // Store the image data in memory as a buffer
// const upload = multer({ storage: storage });

// // GET user profile
// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     // Get the authenticated user's profile
//     const user = await User.findById(req.user.userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Update user profile
// router.patch('/profile', authMiddleware, upload.single('profileImage'), async (req, res) => {
//   try {
//     // Get the authenticated user's profile
//     const user = await User.findById(req.user.userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update profile fields based on req.body
//     if (req.body.firstName) user.firstName = req.body.firstName;
//     if (req.body.lastName) user.lastName = req.body.lastName;
//     if(req.body.email) user.email = req.body.email;
//     if(req.body.password) user.password = req.body.password;
//     if (req.file) user.profile.profileImage = req.file.buffer;
//     // ... other fields

//     await user.save();

//     res.status(200).json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // GET other user's profile
// router.get('/profiles/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;

//       // Find the user by userId
//       const user = await User.findById(userId);

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Respond with the user's profile
//       res.status(200).json(user.profile);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

//   // Handle connection requests
// router.post('/connect/:userId', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const currentUser = await User.findById(req.user.userId);
//     const otherUser = await User.findById(userId);

//     if (!currentUser || !otherUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Implement your logic to establish a connection between users.
//     // For example, you can update the `connections` array in both users' profiles.

//     // Update the current user's connections
//     currentUser.profile.connections.push(userId);

//     // Update the other user's connections
//     otherUser.profile.connections.push(req.user.userId);

//     await currentUser.save();
//     await otherUser.save();

//     res.status(200).json({ message: 'Connection established successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Handle disconnection
// router.post('/disconnect/:userId', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const currentUser = await User.findById(req.user.userId);
//     const otherUser = await User.findById(userId);

//     if (!currentUser || !otherUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Implement your logic to disconnect users.
//     // For example, you can remove the `userId` from the `connections` array in both users' profiles.

//     // Disconnect the current user from the other user
//     currentUser.profile.connections = currentUser.profile.connections.filter(
//       (connectionId) => connectionId.toString() !== userId
//     );

//     // Disconnect the other user from the current user
//     otherUser.profile.connections = otherUser.profile.connections.filter(
//       (connectionId) => connectionId.toString() !== req.user.userId
//     );

//     await currentUser.save();
//     await otherUser.save();

//     res.status(200).json({ message: 'Disconnected successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

//   // Add education to user's profile
// router.post('/education', authMiddleware, async (req, res) => {
//     try {
//       const { school, degree, fieldOfStudy, startDate, endDate } = req.body;

//       // Find the authenticated user
//       const user = await User.findById(req.user.userId);

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Add education to the user's profile
//       user.profile.education.push({
//         school,
//         degree,
//         fieldOfStudy,
//         startDate,
//         endDate,
//       });

//       await user.save();

//       res.status(201).json({ message: 'Education added successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

//   // Delete education from user's profile
// router.delete('/education/:educationId', authMiddleware, async (req, res) => {
//     try {
//       const { educationId } = req.params;

//       // Find the authenticated user
//       const user = await User.findById(req.user.userId);

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Find the index of the education entry to delete
//       const educationIndex = user.profile.education.findIndex(
//         (edu) => edu._id.toString() === educationId
//       );

//       if (educationIndex === -1) {
//         return res.status(404).json({ error: 'Education not found' });
//       }

//       // Remove the education entry from the user's profile
//       user.profile.education.splice(educationIndex, 1);

//       await user.save();

//       res.status(200).json({ message: 'Education deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

module.exports = router;
