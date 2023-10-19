const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken"); // Import the VerificationToken model
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // For generating random tokens
const transporter = require("./transporter.js"); // Import your Nodemailer transporter
const Post = require("../models/Post");
const { default: mongoose } = require("mongoose");


router.post("/like", async (req, res) => {
  try {
    // Extract user data from req.body
    const { postid,id } = req.body;
    // Find the user by email
    const imagepost = await Post.findOne({
        $and: [{ _id: new mongoose.Types.ObjectId(postid) }],
      });

    if (imagepost === null) {
        res.json({ success: false, message: "Some error accured!" });
        return;
      }
      let likes = new Set(imagepost?.likes);
      likes.add(id);
      let alllikes = Array.from(likes);
  
      await Post.updateOne(
        { $and: [{ _id: postid }] },
        { $set: { likes: alllikes } },
        { new: true }
      );
    // Send the token in response
    res.status(200).json({"success":true,"message":"Liked"});
  } catch (error) {
    console.error("Login error:", error); // Add this line
    res.status(500).json({"success":false, error: "Internal server error" });
  }
});

router.post("/dislike", async (req, res) => {
    try {
        // Extract user data from req.body
        const { postid,id } = req.body;
        // Find the user by email
        const imagepost = await Post.findOne({
            $and: [{ _id: new mongoose.Types.ObjectId(postid) }],
          });
    
        if (imagepost === null) {
            res.json({ success: false, message: "Some error accured!" });
            return;
          }
          let likes = new Set(imagepost?.likes);
          likes.delete(id);
          let alllikes = Array.from(likes);
      
          await Post.updateOne(
            { $and: [{ _id: postid }] },
            { $set: { likes: alllikes } },
            { new: true }
          );
        // Send the token in response
        res.status(200).json({"success":true,"message":"Disliked"});
      } catch (error) {
        console.error("Login error:", error); // Add this line
        res.status(500).json({"success":false, error: "Internal server error" });
      }
  });

module.exports = router;


