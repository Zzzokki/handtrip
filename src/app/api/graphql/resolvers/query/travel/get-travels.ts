import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getTravels: QueryResolvers["getTravels"] = async () => {
  const allTravels = await db.query.travelTable.findMany({
    with: {
      company: true,
      subCategories: { with: { subCategory: true } },
      categories: { with: { category: true } },
      travelSessions: { with: { guide: true } },
      agenda: true,
      destination: true,
    },
    limit: 50,
  });

  return allTravels.map((travel) => ({
    ...travel,
    subCategories: travel.subCategories.map((sc) => sc.subCategory),
    categories: travel.categories.map((c) => c.category),
  }));
};
