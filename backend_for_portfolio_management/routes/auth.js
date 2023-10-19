const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken"); // Import the VerificationToken model
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // For generating random tokens
const transporter = require("./transporter.js"); // Import your Nodemailer transporter

router.post("/register", async (req, res) => {
  try {
    // Extract user data from req.body
    const { firstName, lastName, email, password,username } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email is already registered
    const existingUser = await User.findOne({ $or:[{email:email},{username:username}] });
    if (existingUser) {
      return res.status(400).json({ error: "Email or username already exists" });
    }

    // Create a new user in the database
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id, firstName: newUser.firstName }, "Mann@17303");

    const verificationLink = `http://localhost:5000/auth/verify/${token}`;
    const mailOptions = {
      to: newUser.email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: ${verificationLink}`,
    };

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      service: "gmail",
      auth: {
        user: "21ceuos024@ddu.ac.in",
        pass: "mann17303",
      },
    });

    // Use Nodemailer to send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Error sending verification email" });
      } else {
        console.log("Email sent:", info.response);
        res
          .status(201)
          .json({ message: "Verification email sent successfully" });
      }
    });

    const verificationToken = new VerificationToken({
      userId: newUser._id,
      token,
      createdAt: new Date(),
    });
    await verificationToken.save();

    // Send the token in response
    res.status(201).json({ token });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Validation error:", error.errors); // Log validation errors
      res.status(400).json({ error: "Validation error" });
    } else {
      console.error("Registration error:", error); // Log other errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    // Extract user data from req.body
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Invalid credentials - user not found"); // Add this line
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the user's email is verified
    // if (!user.isEmailVerified) {
    //   return res.status(403).json({ error: "Email not verified" });
    // }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Valid:", isPasswordValid); // Add this line
    if (!isPasswordValid) {
      console.log("Invalid credentials - incorrect password"); // Add this line
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, firstName: user.firstName, connections: user.connections }, "Mann@17303");
    console.log("Generated Token:", token); // Add this line

    // Send the token in response
    res.status(200).json({ token, firstName: user.firstName });
  } catch (error) {
    console.error("Login error:", error); // Add this line
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle email verification
router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Find the corresponding VerificationToken
    const verificationToken = await VerificationToken.findOne({ token });

    if (!verificationToken) {
      return res.status(404).json({ error: "Verification token not found" });
    }

    // Find the corresponding User
    const user = await User.findById(verificationToken.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's email verification status
    user.verified = true;
    await user.save();

    // Delete the VerificationToken since it's no longer needed
    await VerificationToken.findByIdAndDelete(verificationToken._id);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Forgot Password - Generate Reset Token and Send Email
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Construct the reset link
    const resetLink = `http://yourapp.com/reset-password/${resetToken}`;

    // Send password reset email
    const mailOptions = {
      to: user.email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Password reset email sent" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the user by reset token and token expiration
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    // Invalidate the JWT token by setting it to an expired token
    const expiredToken = jwt.sign({}, process.env.JWT_SECRET_KEY, {
      expiresIn: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;


