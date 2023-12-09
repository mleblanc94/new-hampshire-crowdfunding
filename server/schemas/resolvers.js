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
  },
  Mutation: {
    createProject: async (_, args) => {
      const newProject = await Project.create(args.input);
      return newProject;
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
