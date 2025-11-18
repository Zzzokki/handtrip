import { gql } from "graphql-tag";

export const guideTypeDefs = gql`
  type Guide {
    id: Int!

    # Guide details
    name: String!
    email: String!
    phoneNumber: String!
    profileImage: String!

    # Company
    companyId: Int!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
