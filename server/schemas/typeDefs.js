const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

    type ProjectInput {
        title: String!
        description: String!
        creator: String!
        fundingGoal: Int!
        currentFunding: Int
        backers: [User]
        interestedIn: [User]
        projectType: String!
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

    type Checkout {
        session: ID
    }

    type auth {
        token: String!
    }

    type Queries {
        getProjectById(id: ID!): Project
        getAllProjects: [Project]
        getUserById(id: ID!): User
        getAllUsers: [User]
        getinterestedIn(projectId: ID!): [User]
        getBackers(projectId: ID!): [User]
    }

    type Mutation {
        createProject(input: ProjectInput!): Project
        updateProject(id: ID!, input: ProjectInput!): Project
        deleteProject(id: ID!): Project
        createUser(input: UserInput!): User
        updateUser(id: ID!, input: UserInput!): User
        deleteUser(id: ID!): User
        addTointerestedIn(projectId: ID!, userId: ID!): Project
        removeFrominterestedIn(projectId: ID!, userId: ID!): Project
        addBackerToProject(projectId: ID!, userId: ID!): Project
      }
`

module.exports = typeDefs;