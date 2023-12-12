const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type ProjectType {
    _id: ID!
    name: String!
    description: String
  }

  input ProjectInput {
    title: String!
    description: String!
    creator: String!
    fundingGoal: Int!    
    projectType: String!
    imageName: String
  }

  type Creator {
    _id: ID!    
  }

  type Project {
    _id: ID!
    title: String!
    description: String!
    creator: Creator
    fundingGoal: Int!
    currentFunding: Int
    backers: [User]
    interestedIn: [User] 
    status: String
    projectType: String!
    createdAt: String
    updatedAt: String
    imageName: String
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
    getAllProjectTypes: [ProjectType] 
  }

  type Mutation {
    createProject(input: ProjectInput!): Project
    createUser(username: String!, email: String!, password: String!): Auth
    addTointerestedIn(projectId: ID!, userId: ID!): Project
    addBackerToProject(projectId: ID!, userId: ID!, currentFunding: Int): Project
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
