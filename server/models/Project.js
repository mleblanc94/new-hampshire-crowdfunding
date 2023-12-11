const { Schema, model } = require('mongoose');

//creates project schema
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    fundingGoal: {
        type: Number,
        required: true
    },
    backers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    interestedIn: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    status: {
        type: String,
        enum: ['active', 'closed'], default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Project = model('Project', projectSchema);

module.exports = Project;
