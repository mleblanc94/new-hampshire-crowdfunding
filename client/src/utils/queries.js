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
query {
    getcreatedProjects(userId: "yourUserId") {
      _id
      created
    }
  }
`;

export const GET_USER_INTERESTED = gql`
query {
    getinterestedIn(userId: "yourUserId") {
      _id
      created
      interested
    }
  }
`;

export const GET_USER_DONATED = gql`
query {
    getbackedProjects(userId: "yourUserId") {
      _id
      created
      interested
    }
  }
`