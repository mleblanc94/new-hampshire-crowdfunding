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

    type Auth {
        token: ID
        user: User
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
        createUser(input: UserInput!): User
        addTointerestedIn(projectId: ID!, userId: ID!): Project
        addBackerToProject(projectId: ID!, userId: ID!, currentFunding: Int): Project
        login(email: String!, password: String!): Auth
      }
`

module.exports = typeDefs;