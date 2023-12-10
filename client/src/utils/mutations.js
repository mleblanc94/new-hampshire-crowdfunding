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
  mutation createProject($title: String!, $description: String!, $category: String!, $creator: String!, $imageName: String!, $fundingGoal: Float!  ) {
    createProject(title: $title, description: $description, category: $category, creator: $creator, imageName: $imageName, fundingGoal: $fundingGoal ) {
      token
      user {
        _id
        username
      }
    }
  }
`;
