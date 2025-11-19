import { gql } from "graphql-tag";

export const guideTypeDefs = gql`
  type Guide {
    id: Int!

    # Guide details
    name: String!
    description: String!
    email: String!
    phoneNumber: String!
    profileImage: String!

    # Company
    companyId: Int!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  input CreateGuideInput {
    name: String!
    description: String!
    email: String!
    phoneNumber: String!
    profileImage: String!
  }

  input UpdateGuideInput {
    name: String
    description: String
    email: String
    phoneNumber: String
    profileImage: String
  }

  type Query {
    getGuidesByCompany(companyId: Int!): [Guide!]!
  }

  type Mutation {
    createGuide(input: CreateGuideInput!): Guide!
    updateGuide(id: Int!, input: UpdateGuideInput!): Guide!
    deleteGuide(id: Int!): Boolean!
  }
`;
