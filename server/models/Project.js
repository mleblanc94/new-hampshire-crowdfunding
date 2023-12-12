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
        required: false,
        default: 'default.png'
    },
    creator: {//this is the foreign key
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    fundingGoal: {
        type: Number,
        required: true
    },
    currentFunding: {
        type: Number,
        default: 0
    },
    backers: [{//this is array of foreign key for the backers/funders
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }],
    interestedIn: [{//this is array of foreign key for the interested users in the projects
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }],
    status: {//this is the status of the project
        type: String,
        enum: ['active', 'closed'], default: 'active'
    },
    projectType: {//this is the foreign key
        type: Schema.Types.ObjectId, ref: 'ProjectType', required: true
    },
    createdAt: {//creates timestamp when created
        type: Date,
        default: Date.now
    },
    updatedAt: {//creates timestamp when updated
        type: Date,
        default: Date.now
    },
});

const Project = model('Project', projectSchema);

module.exports = Project;
