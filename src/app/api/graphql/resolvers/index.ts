import { TimestampResolver } from "graphql-scalars";
import { db } from "@/database";
import * as Mutation from "./mutation";
import * as Query from "./query";

export const resolvers = {
  // Scalars
  Timestamp: TimestampResolver,

  // Mutations and Queries
  Query,
  Mutation,

  // Field Resolvers
  TravelSession: {
    travel: async (parent: any) => {
      const travel = await db.query.travelTable.findFirst({
        where: (travel, { eq }) => eq(travel.id, parent.travelId),
        with: {
          company: true,
          destination: true,
          agenda: true,
          subCategories: { with: { subCategory: true } },
          categories: { with: { category: true } },
          travelSessions: {
            with: {
              guide: true,
            },
          },
        },
      });

      if (!travel) return null;

      return {
        ...travel,
        subCategories: travel.subCategories.map(({ subCategory }) => subCategory),
        categories: travel.categories.map(({ category }) => category),
      };
    },
  },
};
