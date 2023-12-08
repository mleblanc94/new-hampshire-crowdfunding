const { User, Project } = require('./models');
const { AuthenticationError, secret, expiration } = require('../utils/auth')
const jwt = require('jsonwebtoken');

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration})
}

const resolvers = {
  Query: {
    getAllProjects: async () => {
      return await Project.find();
    },
    getinterestedIn: async (_, { interestedIn }) => {
      const projects = await Project.find({ interestedIn: interestedIn });
      return projects;
    },
    getbackedProjects: async (_, { backers }) => {
      const projects = await Project.find({ backers: backers });
      return projects;
    },
    getcreatedProjects: async (_, { creator }) => {
      const projects = await Project.find({ creator: creator });
      return projects;
    },
  },
  Mutation: {
    createProject: async (_, { input }) => {
      const newProject = await Project.create(input);
      return newProject;
    },
    createUser: async (_, { input }) => {
      const newUser = await User.create(input);
      return newUser;
    },
    addTointerestedIn: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(projectId, { $push: { interestedIn: userId } }, { new: true });
      return project;
    },
    addBackerToProject: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(projectId, { $push: { backers: userId } }, { new: true });
      return project;
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError;
      }

      const isValidPassword = await user.isCorrectPassword;

      if (!isValidPassword) {
        throw AuthenticationError
      }

      const token = signToken({ 
        username: user.username,
        email: user.email,
        _id: user_id
      })
       
      return { token, user};
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
