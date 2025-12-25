import { gql } from "graphql-tag";

export const travelTypeDefs = gql`
  # Types

  type Travel {
    id: Int!

    # Travel details
    name: String!
    description: String!
    coverImage: String
    duration: Int!
    totalSeatNumber: Int!
    gallery: [String!]!

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

  # Inputs

  input AgendaItemInput {
    day: Int!
    name: String!
    description: String!
  }

  input CreateTravelSessionInput {
    startDate: Timestamp!
    endDate: Timestamp!
    guideId: Int!
    seatCost: Int!
  }

  input CreateTravelInput {
    name: String!
    description: String!
    coverImage: String!
    gallery: [String!]!
    duration: Int!
    totalSeatNumber: Int!
    agendas: [AgendaItemInput!]!
    travelSessions: [CreateTravelSessionInput!]!
    destinationId: Int!
    subCategoryIds: [Int!]!
  }

  input GetTravelsFilterInput {
    query: String
    companyId: Int
    destinationIds: [Int!]
    subCategoryIds: [Int!]
    minDuration: Int
    maxDuration: Int
    minPrice: Int
    maxPrice: Int
  }

  input GetTravelsByCompanyInput {
    page: Int
    limit: Int
    filters: GetTravelsFilterInput
  }

  input GetTravelsInput {
    page: Int
    limit: Int
    filters: GetTravelsFilterInput
  }

  # Results

  type GetTravelsByCompanyResult {
    travels: [Travel!]!
    totalPages: Int!
    totalTravels: Int!
    currentPage: Int!
  }

  type GetTravelsResult {
    travels: [Travel!]!
    totalPages: Int!
    totalTravels: Int!
    currentPage: Int!
  }

  # Queries & Mutations

  type Query {
    getTravelsByCompany(input: GetTravelsByCompanyInput!): GetTravelsByCompanyResult!
    getTravels(input: GetTravelsInput!): GetTravelsResult!
    getTravel(id: Int!): Travel!
  }

  type Mutation {
    createTravelByCompany(input: CreateTravelInput!): Travel!
    updateTravel(id: Int!, input: CreateTravelInput!): Travel!
    deleteTravel(id: Int!): Travel!
  }
`;
