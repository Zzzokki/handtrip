import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  type Admin {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
