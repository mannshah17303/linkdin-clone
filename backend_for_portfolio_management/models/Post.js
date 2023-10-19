const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: String,      // User's name
  message: String,   // Message content
  photourl: String,  // URL of the user's photo
  likes:Array,
  createdAt: Date
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
