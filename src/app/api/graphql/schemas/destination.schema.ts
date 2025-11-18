import { gql } from "graphql-tag";

export const destinationTypeDefs = gql`
  type Destination {
    id: Int!

    # Destination details
    name: String!
    location: String!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getDestinations: [Destination!]!
  }

  type Mutation {
    createDestination(name: String!, location: String!): Destination!
  }
`;
