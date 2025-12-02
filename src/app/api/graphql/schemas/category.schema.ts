import { gql } from "graphql-tag";

export const categoryTypeDefs = gql`
  type Category {
    id: Int!

    # Category details
    name: String!

    # Relations
    subCategories: [SubCategory!]

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getCategories: [Category!]!
  }
`;
