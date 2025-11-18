import { gql } from "graphql-tag";

export const travelTypeDefs = gql`
  type Travel {
    id: Int!

    # Travel details
    name: String!
    description: String!
    coverImage: String
    duration: Int!
    totalSeatNumber: Int!

    # Company
    companyId: Int!
    company: Company!

    # Agenda
    agendaId: Int!
    agenda: Agenda!

    # Destination
    destinationId: Int!
    destination: Destination!

    # Categories
    categories: [Category!]!
    subCategories: [SubCategory!]!

    # Travel Sessions
    travelSessions: [TravelSession!]!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getTravels: [Travel!]!
    getTravel(id: Int!): Travel!
    getTravelsBySubCategory(subCategoryId: Int!): [Travel!]!
  }
`;
