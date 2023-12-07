import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      title
      description
      category
    }
  }
`;

export const QUERY_PROFILE = gql`
  query user($username: String!) {
    user(username: $username) {
        projects
        favorited
    }
  }
`;