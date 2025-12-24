import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  # Scalars
  scalar Timestamp

  type Query {
    getMeAsCustomer: Customer!
    getMeAsCompany: Company!
    getManagerStats: ManagerStats!
  }

  type ManagerStats {
    totalCompanies: Int!
    totalOrders: Int!
    totalUsers: Int!
    totalRevenue: Float!
    activeTravels: Int!
    todayOrders: Int!
    pendingCompanies: Int!
  }
`;
