const typeDefs = `
    type Projects {
        _id: ID!
        title: String!
        description: String!
        creator: String!
        fundingGoal: Int!
        currentFunding: Int
        backers: String
        status: String
        projectType: String!
        createdAt: String
        updatedAt: String
    }

    type ProjectType {
        _id: ID!
        name: String!
        description: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Quaries {
        getProjectById(id: ID!): Project
        getAllProjects: [Project]
        getProjectTypeById(id: ID!): ProjectType
        getAllProjectTypes: [ProjectType]
        getUserById(id: ID!): User
        getAllUsers: [User]
    }

    type Mutation {
        createProject(input: ProjectInput!): Project
        updateProject(id: ID!, input: ProjectInput!): Project
        deleteProject(id: ID!): Project
        createProjectType(input: ProjectTypeInput!): ProjectType
        updateProjectType(id: ID!, input: ProjectTypeInput!): ProjectType
        deleteProjectType(id: ID!): ProjectType
        createUser(input: UserInput!): User
        updateUser(id: ID!, input: UserInput!): User
        deleteUser(id: ID!): User
      }
`