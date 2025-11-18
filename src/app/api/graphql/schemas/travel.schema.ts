import { gql } from "graphql-tag";

export const travelTypeDefs = gql`
  type Travel {
    id: Int!

    # Travel details
    name: String!
    description: String!
    coverImage: String
    duration: Int!
    maxGuests: Int!

    # Relations
    companyId: Int!
    company: Company!

    # Categories
    categories: [Category!]!
    subCategories: [SubCategory!]!

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
