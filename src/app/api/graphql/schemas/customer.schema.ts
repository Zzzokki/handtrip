import { gql } from "graphql-tag";

export const customerTypeDefs = gql`
  type Customer {
    id: Int!

    # Customer details
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!

    # Authentication
    username: String!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getCustomer(id: ID!): Customer!
  }
`;
