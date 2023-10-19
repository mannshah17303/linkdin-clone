const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken"); // Import the VerificationToken model
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // For generating random tokens
const transporter = require("./transporter.js"); // Import your Nodemailer transporter


router.post("/", async (req, res) => {
  try {
    // Extract user data from req.body
    const { query } = req.body;
    console.log(query)
    // Find the user by email
    let user = await User.find({ username: { '$regex': '^' + query + '$', $options: "i" } });
    // Send the token in response
    res.status(200).json({"success":true,user});
  } catch (error) {
    console.error("Login error:", error); // Add this line
    res.status(500).json({"success":false, error: "Internal server error" });
  }
});

router.post("/profile", async (req, res) => {
    try {
      // Extract user data from req.body
      const { username } = req.body;
    //   console.log(query)
      // Find the user by email
      let user = await User.findOne({ username: username});
      if(user===null){
        res.status(404).json({"success":false, error: "User not Found" });
        return;
      }
      // Send the token in response
      res.status(200).json({"success":true,user});
      return;
    } catch (error) {
      console.error("Login error:", error); // Add this line
      res.status(500).json({"success":false, error: "Internal server error" });
      return;
    }
  });

module.exports = router;


