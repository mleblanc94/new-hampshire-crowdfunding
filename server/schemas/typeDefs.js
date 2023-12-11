const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input ProjectInput {
    title: String!
    description: String!
    creator: String!
    fundingGoal: Int!
    currentFunding: Int
    backers: [String]  # Assuming the backer's IDs are strings
    interestedIn: [String]  # Assuming the interested user's IDs are strings
    projectType: String!
    imageName: String!
  }

  type Project {
    _id: ID!
    title: String!
    description: String!
    creator: String!
    fundingGoal: Int!
    currentFunding: Int
    backers: [User]
    interestedIn: [User] 
    status: String
    projectType: String!
    createdAt: String
    updatedAt: String
    imageName: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getAllProjects: [Project]
    getinterestedIn(interestedIn: ID!): [Project]
    getbackedProjects(backers: ID!): [Project]
    getcreatedProjects(creator: ID!): [Project]
  }

  type Mutation {
    createProject(title: String!, description: String!, category: String!, creator: String!, imageName: String!, fundingGoal: Float!): Project
    createUser(username: String!, email: String!, password: String!): Auth
    addTointerestedIn(projectId: ID!, userId: ID!): Project
    addBackerToProject(projectId: ID!, userId: ID!, currentFunding: Int): Project
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
