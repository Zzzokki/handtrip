import { gql } from "graphql-tag";

export const subCategoryTypeDefs = gql`
  type SubCategory {
    id: Int!

    # SubCategory details
    name: String!

    # Category
    categoryId: Int!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getSubCategories: [SubCategory!]!
    getSubCategory(id: Int!): SubCategory!
    getSubCategoriesByCategory(categoryId: Int!): [SubCategory!]!
  }
`;
