import { gql } from "graphql-tag";

export const managerTypeDefs = gql`
  type Manager {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String
    username: String!
    companyId: Int
    company: Company
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
