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

  input CreateCustomerInput {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
    username: String!
    password: String!
  }
  input UpdateCustomerInput {
    id: Int!
    firstName: String
    lastName: String
    phoneNumber: String
    email: String
    username: String
  }

  type Query {
    getCustomer(id: Int!): Customer!
  }
  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer!
    updateCustomer(input: UpdateCustomerInput!): Customer!
    deleteCustomer(id: Int!): Customer!
  }
`;
