import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  input RegisterAsCustomerInput {
    username: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
  }

  type AuthResponse {
    token: String!
    user: Customer!
  }

  type CompanyAuthResponse {
    token: String!
    user: Company!
  }

  type Mutation {
    loginAsCustomer(username: String!, password: String!): AuthResponse!
    loginAsCompany(username: String!, password: String!): CompanyAuthResponse!

    registerAsCustomer(input: RegisterAsCustomerInput): AuthResponse!
  }
`;
