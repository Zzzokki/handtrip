import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  # Scalars
  scalar Timestamp

  type Query {
    getMeAsCustomer: Customer!
    getMeAsCompany: Company!
  }
`;
