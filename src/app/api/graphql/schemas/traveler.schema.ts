import { gql } from "graphql-tag";

export const travelerTypeDefs = gql`
  type Traveler {
    id: Int!

    # Personal Information
    name: String!
    email: String!
    phoneNumber: String!
    dateOfBirth: Timestamp!

    # Order
    orderId: Int!

    # Seat
    seatId: Int!
    seat: Seat!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getTraveler(id: Int!): Traveler!
    getTravelersByOrder(orderId: Int!): [Traveler!]!
  }
`;
