const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String, // User's first name
  PhotoImg: String, // URL of the profile image
  createdAt: Date,
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
