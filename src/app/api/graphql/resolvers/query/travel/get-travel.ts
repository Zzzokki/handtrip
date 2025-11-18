import { db } from "../../../database";
import type { QueryResolvers } from "../../../types/generated.ts/types.generated";

export const getTravel: NonNullable<QueryResolvers["getTravel"]> = async (
  _,
  { id }
) => {
  const travel = await db.query.travelTable.findFirst({
    where: (travel, { eq }) => eq(travel.id, id),
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
  });

  if (!travel) throw new Error("Travel not found");

  return {
    ...travel,
    subCategories: travel.subCategories.map((sc) => sc.subCategory),
    categories: travel.categories.map((c) => c.category),
  };
};
