const { Schema, model } = require('mongoose');

const projectTypeSchema = new Schema({
    name: {
        type: String, required: true,
        unique: true
    },
    description: {
        type: String
    },
});

const ProjectType = model('ProjectType', projectTypeSchema);

module.exports = ProjectType;