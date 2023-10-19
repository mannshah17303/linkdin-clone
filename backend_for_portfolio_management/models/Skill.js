const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
