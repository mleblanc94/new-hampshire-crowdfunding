
const { User, Project, ProjectType } = require('./models');

const resolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      return await User.findById(userId);
    },
    getProjectById: async (_, { projectId }) => {
      return await Project.findById(projectId);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const newUser = new User({ username, email, password });
      await newUser.save();
      return newUser;
    },
    createProject: async (_, { title, description, creator, fundingGoal, projectType }) => {
      const newProject = new Project({ title, description, creator, fundingGoal, projectType });
      await newProject.save();
      return newProject;
    },
  },
  Project: {
    creator: async (parent) => {
      return await User.findById(parent.creator);
    },
    backers: async (parent) => {
      return await User.find({ _id: { $in: parent.backers } });
    },
    projectType: async (parent) => {
      return await ProjectType.findById(parent.projectType);
    },
  },
};

module.exports = resolvers;
