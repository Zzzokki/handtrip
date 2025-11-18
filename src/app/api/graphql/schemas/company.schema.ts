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
    username: String!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
  input CreateCompanyInput {
    name: String!
    logo: String!
    coverImage: String!
    phoneNumber: String!
    email: String!
    description: String!
    username: String!
    password: String!
  }
  input UpdateCompanyInput {
    id: Int!
    name: String
    logo: String
    coverImage: String
    phoneNumber: String
    email: String
    description: String
    username: String
  }

  type Query {
    getCompany(id: Int!): Company!
  }
  type Mutation {
    createCompany(input: CreateCompanyInput!): Company!
    updateCompany(input: UpdateCompanyInput!): Company!
    deleteCompany(id: Int!): Company!
  }
`;
