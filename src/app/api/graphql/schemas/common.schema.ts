import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  # Scalars
  scalar Timestamp

  type Query {
    getMeAsCustomer: Customer!
    getMeAsCompany: Company!
    getMeAsAdmin: Admin!
    getMeAsManager: Manager!
    getManagerStats: ManagerStats!
    getAdminStats: AdminStats!
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

  type AdminStats {
    totalUsers: Int!
    verifiedCompanies: Int!
    totalRevenue: Float!
    activeOrders: Int!
    todayRevenue: Float!
    todayOrders: Int!
    pendingCompanies: Int!
  }
`;
