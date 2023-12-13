import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    _id
    title
    description
    creator {
      _id
    }
    fundingGoal
    projectType
    imageName
    }
  }
`;

export const UPDATE_FUNDING = gql`
  mutation UpdateFunding($projectId: ID!, $amount: Float!, $userId: ID!) {
    updateFunding(projectId: $projectId, amount: $amount, userId: $userId) {
      id
      currentFunding
      backers {
        id
        username
      }
    }
  }
`;