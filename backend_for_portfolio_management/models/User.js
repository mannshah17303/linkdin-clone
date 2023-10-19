const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{type:String,unique:true},
  firstName: String,
  lastName: String,
  image:String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date,
  connections: {            // Array of ObjectIds referencing user's connections
    pending:[
      {
        type: Schema.Types.ObjectId, ref: 'User'
      }
    ],
    connections:[
      {
        type: Schema.Types.ObjectId, ref: 'User'
      }
    ],

  },

  profile: {                    // User's profile information
    headline: String,         // Headline or professional title
    summary: String,          // Summary or bio about the user
    experience: [               // Array of user's work experiences
      {
        title: String,        // Job title
        company: String,      // Company name
        startDate: Date,      // Start date of the experience
        endDate: Date,        // End date of the experience
        description: String   // Description of the role
      }
    ],
    education: [                // Array of user's education details
      {
        school: String,       // School or university name
        degree: String,       // Degree obtained
        fieldOfStudy: String, // Field of study
        startDate: Date,      // Start date of the education
        endDate: Date         // End date of the education
      }
    ],
    posts: [
      {
        message: String,   // The message of the post
        createdAt: Date    // The creation date of the post
      }
    ],
    profileImage: {
      type: String, // You can use String to store the image file path
      default:"http://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
      // Alternatively, you can use Buffer to store the image data as binary
      // type: Buffer,
    },
}

});

const User = mongoose.model('User', userSchema);

module.exports = User;
