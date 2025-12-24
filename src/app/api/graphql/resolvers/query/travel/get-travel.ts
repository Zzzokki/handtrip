import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getTravel: QueryResolvers["getTravel"] = async (_, { id }) => {
  const travel = await db.query.travelTable.findFirst({
    where: (travel, { eq }) => eq(travel.id, id),
    with: {
      company: true,
      subCategories: { with: { subCategory: true } },
      categories: { with: { category: true } },
      travelSessions: {
        with: {
          guide: true,
          seats: {
            with: {
              seatCost: true,
            },
          },
        },
      },
      agenda: true,
      destination: true,
    },
  });

  if (!travel) throw new Error("Travel not found");

  return {
    ...travel,
    subCategories: travel.subCategories.map(({ subCategory }) => subCategory).filter((sc) => sc !== null),
    categories: travel.categories.map(({ category }) => category).filter((c) => c !== null),
  };
};
