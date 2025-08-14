const { User, Project, ProjectType } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');

const secret = 'mysecretsshhhh';
const expiration = '2h';

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}

const resolvers = {
  Query: {
    getAllProjects: async () => {
      return await Project.find();
    },
    getcreatedProjects: async (_, { creator }) => {
      const projects = await Project.find({ creator });
      return projects;
    },
    getNotcreatedProjects: async (_, { creator }) => {
      const projects = await Project.find({ creator: { $ne: creator } });
      return projects;
    },
    getinterestedIn: async (_, { interestedIn }) => {
      try {
        const interestedInObjectId = new mongoose.Types.ObjectId(interestedIn);
        const projects = await Project.find({ interestedIn: { $in: interestedIn } });
        return projects;
      } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Unable to fetch projects');
      }
    },
    getbackedProjects: async (_, { backers }) => {
      const projects = await Project.find({ backers });
      return projects;
    },
    getAllProjectTypes: async () => {
      try {
        const projectTypes = await ProjectType.find();
        return projectTypes;
      } catch (error) {
        console.error('Error fetching project types:', error);
        throw new Error('Unable to fetch project types');
      }
    },
  },
  Mutation: {
    createProject: async (_, { input }) => {
      try {
        const newProject = await Project.create(input);
        return newProject;
      } catch (error) {
        console.error('Error creating project:', error);
        // Handle the error appropriately, e.g., throw a custom error
        throw new Error('Unable to create project');
      }
    },
    createUser: async (_, args) => {
      if (args.input) {
        const newUser = await User.create(args.input);
        return newUser;
      } else {
        const { username, email, password } = args;
        const user = await User.create({ username, email, password });
        if (!user) { throw new AuthenticationError('User creation failed'); }

        const token = signToken({
          username: user.username,
          email: user.email,
          _id: user._id,
        });

        return { token, user };
      }
    },
    addTointerestedIn: async (_, { projectId, userId }) => {
      try {
        const project = await Project.findByIdAndUpdate(
          projectId,
          { $addToSet: { interestedIn: userId } },
          { new: true }
        );     

        return project;
      } catch (error) {
        throw new Error(`Error adding backer: ${error.message}`);
      }
    },
    addBackerToProject: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { backers: userId }, $inc: { currentFunding } },
        { new: true }
      );
      return project;
    },
    login: async (_, { email, password }) => {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("Incorrect login credentials!");
      // Check if password is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError("Incorrect login credentials!");

      const token = signToken(user);// Issue token

      return { token, user };// Return token and user   
    },
    updateFunding: async (_, { projectId, amount, userId }) => {
      try {
        // Find the project by ID and increment its currentFunding and add userId to backers
        const updatedProject = await Project.findByIdAndUpdate(
          projectId,
          {
            $inc: { currentFunding: amount }, // Increment currentFunding by the specified amount
            $addToSet: { backers: userId } // Add userId to backers array
          },
          { new: true } // Return the updated document
        ).populate('backers');

        if (!updatedProject) {
          throw new Error('Project not found or unable to update funding');
        }

        return updatedProject;
      } catch (error) {
        console.error('Error updating project funding:', error);
        throw new Error('Unable to update project funding');
      }
    },
  },
  Project: {
    backers: async (parent) => {
      return await User.find({ _id: { $in: parent.backers } });
    },
    interestedIn: async (parent) => {
      return await User.find({ _id: { $in: parent.interestedIn } });
    },
  },
};

module.exports = resolvers;
