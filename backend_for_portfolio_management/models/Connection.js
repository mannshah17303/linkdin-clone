const mongoose = require('mongoose');
const User = require('./User.js');
import User  from './User.js';

const connectionSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
  connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: Date,
  updatedAt: Date
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
