const { User, Project } = require('./models');

const resolvers = {
  Query: {
    getProjectById: async (_, { id }) => {
      return await Project.findById(id);
    },
    getAllProjects: async () => {
      return await Project.find();
    },
    getUserById: async (_, { id }) => {
      return await User.findById(id);
    },
    getAllUsers: async () => {
      return await User.find();
    },
  
  },
  Mutation: {
    createProject: async (_, { input }) => {
      const newProject = await Project.create(input);
      return newProject;
    },
    updateProject: async (_, { id, input }) => {
      return await Project.findByIdAndUpdate(id, input, { new: true });
    },
    deleteProject: async (_, { id }) => {
      return await Project.findByIdAndDelete(id);
    },
    createUser: async (_, { input }) => {
      const newUser = await User.create(input);
      return newUser;
    },
    updateUser: async (_, { id, input }) => {
      return await User.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
    addTointerestedIn: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(projectId, { $push: { interestedIn: userId } }, { new: true });
      return project;
    },
    removeFrominterestedIn: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(projectId, { $pull: { interestedIn: userId } }, { new: true });
      return project;
    },
    addBackerToProject: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(projectId, { $push: { backers: userId } }, { new: true });
      return project;
    },
    removeBackerFromProject: async (_, { projectId, userId }) => {
      const project = await Project.findByIdAndUpdate(projectId, { $pull: { backers: userId } }, { new: true });
      return project;
    },
  
  },
  Project: {
    creator: async (parent) => {
      return await User.findById(parent.creator);
    },
    backers: async (parent) => {
      return await User.find({ _id: { $in: parent.backers } });
    },
    interestedIn: async (parent) => {
      return await User.find({ _id: { $in: parent.interestedIn } });
    },

  },
};

module.exports = resolvers;
