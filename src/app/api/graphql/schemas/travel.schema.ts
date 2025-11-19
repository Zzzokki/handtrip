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

  input AgendaItemInput {
    day: Int!
    title: String!
    description: String!
  }

  input CreateAgendaInput {
    items: [AgendaItemInput!]!
  }

  input SeatCostInput {
    cost: Int!
  }

  input CreateTravelSessionInput {
    startDate: Timestamp!
    endDate: Timestamp!
    guideId: Int!
    seatCost: SeatCostInput!
  }

  input CreateTravelInput {
    name: String!
    description: String!
    coverImage: String
    duration: Int!
    totalSeatNumber: Int!
    companyId: Int!
    destinationId: Int!
    agenda: CreateAgendaInput!
    travelSessions: [CreateTravelSessionInput!]!
    categoryIds: [Int!]!
    subCategoryIds: [Int!]!
  }

  type Query {
    getTravels: [Travel!]!
    getTravel(id: Int!): Travel!
    getTravelsByCompany(companyId: Int!): [Travel!]!
  }

  type Mutation {
    createTravel(input: CreateTravelInput!): Travel!
    updateTravel(id: Int!, input: CreateTravelInput!): Travel!
    deleteTravel(id: Int!): Travel!
  }
`;
