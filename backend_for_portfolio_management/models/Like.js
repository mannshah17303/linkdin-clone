const mongoose = require('mongoose');
const User = require('./User.js');
const Post = require('./Post.js');
import User  from './User.js';
import Post from './Post.js';

const likeSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' }, 
  createdAt: Date,
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;