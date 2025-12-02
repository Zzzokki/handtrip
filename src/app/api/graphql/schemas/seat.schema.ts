import { gql } from "graphql-tag";

export const seatTypeDefs = gql`
  enum SeatStatus {
    AVAILABLE
    RESERVED
    OCCUPIED
  }

  type Seat {
    id: Int!

    # Seat details
    status: SeatStatus!

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
