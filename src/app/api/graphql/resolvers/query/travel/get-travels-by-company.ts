import { QueryResolvers } from "@/api/types";
import { db, travelTable } from "@/database";
import { eq, count } from "drizzle-orm";

export const getTravelsByCompany: QueryResolvers["getTravelsByCompany"] = async (_, { input }, { user }) => {
  if (!user) throw new Error("Unauthenticated");

  if (user.role !== "company") throw new Error("Unauthorized");

  const { page = 1, limit = 12 } = input;

  const travels = await db.query.travelTable.findMany({
    where: eq(travelTable.companyId, user.id),
    offset: (page - 1) * limit,
    limit,
    with: {
      company: true,
      subCategories: { with: { subCategory: true } },
      categories: { with: { category: true } },
      travelSessions: { with: { guide: true } },
      agenda: true,
      destination: true,
    },
  });

  const [{ count: totalTravels }] = await db.select({ count: count() }).from(travelTable).where(eq(travelTable.companyId, user.id));

  const totalPages = Math.ceil(totalTravels / limit);

  return {
    travels: travels.map((travel) => ({
      ...travel,
      subCategories: travel.subCategories.map((sc) => sc.subCategory).filter((sc) => sc !== null),
      categories: travel.categories.map((c) => c.category).filter((sc) => sc !== null),
    })),
    totalPages,
    totalTravels,
    currentPage: page,
  };
};
