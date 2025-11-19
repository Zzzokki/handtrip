import { gql } from "graphql-tag";

export const orderTypeDefs = gql`
  type Order {
    id: Int!

    # Order details
    totalSeats: Int!
    totalPrice: Int!
    orderStatus: Int!

    # Customer
    customerId: Int!
    customer: Customer!

    # Travel Session
    travelSessionId: Int!
    travelSession: TravelSession!

    # Payment
    paymentId: Int!
    payment: Payment!

    # Travelers
    travelers: [Traveler!]!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getOrders: [Order!]!
    getOrder(id: Int!): Order!
    getOrdersByCustomer(customerId: Int!): [Order!]!
    getOrdersByCompany(companyId: Int!): [Order!]!
    getOrdersByTravelSession(travelSessionId: Int!): [Order!]!
  }
`;
