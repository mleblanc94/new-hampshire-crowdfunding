import { gql } from '@apollo/client';

export const QET_ALL_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      title
      description
      category
    }
  }
`;

export const GET_USER_CREATED = gql`
  query GetUserCreated($userId: ID!) {
    getcreatedProjects(creator: $userId) {
      _id
      title
      description
    }
  }
`;

export const GET_USER_INTERESTED = gql`
  query GetUserInterested($userId: ID!) {
    getinterestedIn(interestedIn: $userId) {
      _id
      title
      description
    }
  }
`;

export const GET_USER_DONATED = gql`
  query GetUserDonated($userId: ID!) {
    getbackedProjects(backers: $userId) {
      _id
      title
      description
    }
  }
`;