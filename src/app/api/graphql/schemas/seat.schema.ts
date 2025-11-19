import { gql } from "graphql-tag";

export const seatTypeDefs = gql`
  type Seat {
    id: Int!

    # Seat details
    status: String!

    # Travel Session
    travelSessionId: Int!

    # Seat Cost
    seatCostId: Int!
    seatCost: SeatCost!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getSeat(id: Int!): Seat!
    getSeatsByTravelSession(travelSessionId: Int!): [Seat!]!
  }
`;
