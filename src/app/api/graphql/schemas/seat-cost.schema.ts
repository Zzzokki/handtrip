import { gql } from "graphql-tag";

export const seatCostTypeDefs = gql`
  type SeatCost {
    id: Int!

    # Seat cost details
    cost: Int!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getSeatCost(id: Int!): SeatCost!
    getSeatCosts: [SeatCost!]!
  }
`;
