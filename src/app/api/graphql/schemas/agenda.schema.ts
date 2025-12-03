import { gql } from "graphql-tag";

export const agendaTypeDefs = gql`
  type Agenda {
    id: Int!

    # Agenda details
    day: Int!
    name: String!
    description: String!

    # Foreign Key to Travel
    travelId: Int!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
