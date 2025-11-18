import { gql } from "graphql-tag";

export const companyTypeDefs = gql`
  type Company {
    id: Int!

    # Company details
    name: String!
    logo: String!
    coverImage: String!
    phoneNumber: String!
    email: String!
    description: String!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getCompany(id: ID!): Company!
  }
`;
