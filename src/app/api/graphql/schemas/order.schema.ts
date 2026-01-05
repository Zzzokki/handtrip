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

  input TravelerInput {
    name: String!
    email: String!
    phoneNumber: String!
    dateOfBirth: Timestamp!
  }

  input CreateOrderInput {
    travelSessionId: Int!
    travelers: [TravelerInput!]!
    paymentIntentId: String
  }

  type CreateOrderResponse {
    order: Order!
    success: Boolean!
    message: String!
  }

  type UpdateOrderPaymentResponse {
    order: Order!
    success: Boolean!
    message: String!
  }

  type UpdatePaymentIntentResponse {
    success: Boolean!
    message: String!
  }

  type CancelOrderResponse {
    order: Order!
    success: Boolean!
    message: String!
  }

  type Query {
    getOrders: [Order!]!
    getOrder(id: Int!): Order!
    getOrdersByCustomer(customerId: Int!): [Order!]!
    getOrdersByCompany(companyId: Int!): [Order!]!
    getOrdersByTravelSession(travelSessionId: Int!): [Order!]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): CreateOrderResponse!
    updateOrderPayment(orderId: Int!, paymentIntentId: String!): UpdateOrderPaymentResponse!
    updatePaymentIntent(orderId: Int!, paymentIntentId: String!): UpdatePaymentIntentResponse!
    cancelOrder(orderId: Int!): CancelOrderResponse!
  }
`;
