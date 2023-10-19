const nodemailer = require('nodemailer');

// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email service provider
  auth: {
    user: '21ceuos024@ddu.ac.in', // Replace with your email
    pass: 'mann17303',   // Replace with your email password
  },
});

module.exports = transporter;
