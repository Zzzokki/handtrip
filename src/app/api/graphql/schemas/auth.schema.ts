import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  input RegisterAsCustomerInput {
    username: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
  }

  # Responses

  type LoginAsCustomerResponse {
    token: String!
    customer: Customer!
  }

  type LoginAsCompanyResponse {
    token: String!
    company: Company!
  }

  type Mutation {
    loginAsCustomer(username: String!, password: String!): LoginAsCustomerResponse!
    loginAsCompany(username: String!, password: String!): LoginAsCompanyResponse!

    registerAsCustomer(input: RegisterAsCustomerInput!): LoginAsCustomerResponse!
  }
`;
