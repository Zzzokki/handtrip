import { QueryResolvers } from "@/api/types";
import { db, travelSessionTable, travelTable } from "@/database";
import { and, count, eq, exists, gte, ilike, inArray, lte, SQL } from "drizzle-orm";

export const getTravels: QueryResolvers["getTravels"] = async (_, { input }) => {
  const { page = 1, limit = 16, filters = {} } = input;

  const conditions: SQL[] = [];

  if (filters.query) conditions.push(ilike(travelTable.name, `%${filters.query.toLowerCase().trim()}%`));

  if (filters.destinationIds) conditions.push(inArray(travelTable.destinationId, filters.destinationIds));

  if (filters.subCategoryIds) {
    const joins = await db.query.subCategoryToTravelTable.findMany({
      where: (table, { inArray }) => inArray(table.subCategoryId, filters.subCategoryIds!),
    });

    conditions.push(
      inArray(
        travelTable.id,
        joins.map((join) => join.travelId)
      )
    );
  }

  if (filters.minDuration) conditions.push(gte(travelTable.duration, filters.minDuration));

  if (filters.maxDuration) conditions.push(lte(travelTable.duration, filters.maxDuration));

  const travels = await db.query.travelTable.findMany({
    where: (travel) =>
      and(
        ...conditions,
        exists(
          db
            .select()
            .from(travelSessionTable)
            .where(and(gte(travelSessionTable.startDate, new Date()), eq(travelSessionTable.travelId, travel.id)))
        )
      ),
    offset: (page - 1) * limit,
    limit,
    with: {
      company: true,
      subCategories: { with: { subCategory: true } },
      categories: { with: { category: true } },
      travelSessions: {
        where: (table, { gte }) => gte(table.startDate, new Date()),
        with: { guide: true },
      },
      agenda: true,
      destination: true,
    },
  });

  const [{ count: totalTravels }] = await db.select({ count: count() }).from(travelTable);

  const totalPages = Math.ceil(totalTravels / limit);

  return {
    travels: travels.map((travel) => ({
      ...travel,
      subCategories: travel.subCategories.map((sc) => sc.subCategory).filter((sc) => sc !== null),
      categories: travel.categories.map((c) => c.category).filter((c) => c !== null),
    })),
    totalPages,
    totalTravels,
    currentPage: 1,
  };
};
