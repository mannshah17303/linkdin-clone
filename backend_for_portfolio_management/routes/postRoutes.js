  const express = require('express');
  const router = express.Router();
  // const authMiddleware = require('./auth'); // Import the authMiddleware
  // const User = require('../models/User'); // Import the User model
  const Post = require('../models/Post');
  // const Post = require('../models/Post'); // Import the Post model

  // // Create a new post
  // router.post('/create', authMiddleware, async (req, res) => {
  //   try {
  //     try {
  //       console.log('Request body:', req.body); // Log the request body
  //       // Rest of your route logic...
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     const { content } = req.body;

  //     // Find the authenticated user
  //     const user = await User.findById(req.user.userId);

  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' });
  //     }

  //     // Create a new post
  //     const newPost = new Post({
  //       user: user._id,
  //       content,
  //       createdAt: new Date(),
  //     });

  //     await newPost.save();

  //     res.status(201).json({ message: 'Post created successfully' });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });

  // // Edit a post
  // router.put('/edit/:postId', authMiddleware, async (req, res) => {
  //     try {
  //       const { postId } = req.params;
  //       const { content } = req.body;

  //       // Find the post by postId
  //       const post = await Post.findById(postId);

  //       if (!post) {
  //         return res.status(404).json({ error: 'Post not found' });
  //       }

  //       // Check if the authenticated user is the author of the post
  //       if (post.user.toString() !== req.user.userId) {
  //         return res.status(403).json({ error: 'You do not have permission to edit this post' });
  //       }

  //       // Update the post content
  //       post.content = content;
  //       post.updatedAt = new Date();

  //       await post.save();

  //       res.status(200).json({ message: 'Post edited successfully' });
  //     } catch (error) {
  //       res.status(500).json({ error: 'Internal server error' });
  //     }
  //   });

  //   // Delete a post
  // router.delete('/delete/:postId', authMiddleware, async (req, res) => {
  //     try {
  //       const { postId } = req.params;

  //       // Find the post by postId
  //       const post = await Post.findById(postId);

  //       if (!post) {
  //         return res.status(404).json({ error: 'Post not found' });
  //       }

  //       // Check if the authenticated user is the author of the post
  //       if (post.user.toString() !== req.user.userId) {
  //         return res.status(403).json({ error: 'You do not have permission to delete this post' });
  //       }

  //       // Delete the post
  //       await post.remove();

  //       res.status(200).json({ message: 'Post deleted successfully' });
  //     } catch (error) {
  //       res.status(500).json({ error: 'Internal server error' });
  //     }
  //   });

  // module.exports = router;

  router.post("/posts", async (req, res) => {
    try {
      const {name, message, photourl } = req.body;
      // const user = await User.findOne({ email: userEmail });
      console.log("Received POST request to:", req.originalUrl); // Log the request URL
      console.log("Request body:", req.body); // Debugging line

      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }

      const newPost = new Post({
        name: name,
        message: message,
        photourl: photourl,
        createdAt: new Date()
    });

      // user.profile.posts.push(newPost);
      await newPost.save();

      // res.status(201).json(newPost);
      // For debugging, send a simple JSON response
      res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/getposts", async (req, res) => {
    try {
      const newPost = await Post.find().sort({createdAt:-1});
      res.status(200).json({ success:true,newPost });
    } catch (error) {
      res.status(500).json({ success:false,error: error.message });
    }
  });

  module.exports = router;
