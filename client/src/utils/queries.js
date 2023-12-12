import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
  query getAllProjects {
    getAllProjects {
      _id
      title
      description
      projectType
    }
  }
`;

export const GET_ALL_PROJECT_TYPES = gql`
  query getAllProjectTypes {
    getAllProjectTypes {
      _id
      name
    }
  }
`;  

export const GET_USER_CREATED = gql`
  query GetUserCreated($userId: ID!) {
    getcreatedProjects(creator: $userId) {
      _id
      title
      description
      fundingGoal
      currentFunding
      imageName
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
