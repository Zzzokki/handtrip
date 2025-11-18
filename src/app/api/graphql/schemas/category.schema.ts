import { gql } from "graphql-tag";

export const categoryTypeDefs = gql`
  type Category {
    id: Int!

    # Category details
    name: String!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type SubCategory {
    id: ID!

    # SubCategory details
    name: String!

    categoryId: Int!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getCategories: [Category!]!
    getSubCategories: [SubCategory!]!
  }
`;
