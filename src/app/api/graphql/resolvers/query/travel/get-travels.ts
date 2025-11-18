import { db } from "../../../database";
import type { QueryResolvers } from "../../../types/generated.ts/types.generated";

export const getTravels: NonNullable<
  QueryResolvers["getTravels"]
> = async () => {
  const allTravels = await db.query.travelTable.findMany({
    with: {
      company: true,
      subCategories: {
        with: {
          subCategory: true,
        },
      },
      categories: {
        with: {
          category: true,
        },
      },
    },
    limit: 50,
  });

  return allTravels.map((travel) => ({
    ...travel,
    subCategories: travel.subCategories.map((sc) => sc.subCategory),
    categories: travel.categories.map((c) => c.category),
  }));
};
