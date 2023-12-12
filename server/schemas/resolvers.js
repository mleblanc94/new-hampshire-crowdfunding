const { User, Project } = require('../models');
const { AuthenticationError } = require('../utils/auth')
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhh';
const expiration = '2h';

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration})
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
    getinterestedIn: async (_, { interestedIn }) => {
      const projects = await Project.find({ interestedIn });
      return projects;
    },
    getbackedProjects: async (_, { backers }) => {
      const projects = await Project.find({ backers });
      return projects;
    },    
    getAllProjectTypes: async () => {
      // Implement logic to fetch all project types from the database
      const projectTypes = await ProjectType.find();
      return projectTypes;
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
      if (!user) {
        throw new AuthenticationError;
      }

      const token = signToken({ 
        username: user.username,
        email: user.email,
        _id: user._id,
      });

      return { token, user };
    }
  },
    addTointerestedIn: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { interestedIn: userId } },
        { new: true }
      );
      return project;
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
