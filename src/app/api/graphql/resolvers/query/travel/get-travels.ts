import { QueryResolvers } from "@/api/types";
import { db, travelTable } from "@/database";
import { and, eq, gte, lte, inArray, sql } from "drizzle-orm";

export const getTravels: QueryResolvers["getTravels"] = async (_, args) => {
  const page = args.page || 1;
  const limit = args.limit || 10;
  const offset = (page - 1) * limit;
  const filters = args.filters || {};

  // Build where conditions
  const conditions = [];

  if (filters.destinationIds && filters.destinationIds.length > 0) {
    conditions.push(inArray(travelTable.destinationId, filters.destinationIds));
  }

  if (filters.minDuration !== undefined && filters.minDuration !== null) {
    conditions.push(gte(travelTable.duration, filters.minDuration));
  }

  if (filters.maxDuration !== undefined && filters.maxDuration !== null) {
    conditions.push(lte(travelTable.duration, filters.maxDuration));
  }

  // For subcategory filtering, we need to join with the junction table
  let query = db.query.travelTable.findMany({
    with: {
      company: true,
      subCategories: { with: { subCategory: true } },
      categories: { with: { category: true } },
      travelSessions: { with: { guide: true } },
      agenda: true,
      destination: true,
    },
    where: conditions.length > 0 ? and(...conditions) : undefined,
  });

  let allTravels = await query;

  // Filter by subcategories if provided
  if (filters.subCategoryIds && filters.subCategoryIds.length > 0) {
    allTravels = allTravels.filter((travel) => travel.subCategories.some((sc) => filters.subCategoryIds!.includes(sc.subCategory.id)));
  }

  // Filter by price if provided (calculate from min seat cost)
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    allTravels = await Promise.all(
      allTravels.map(async (travel) => {
        // Get the minimum seat cost for this travel
        const sessions = await db.query.travelSessionTable.findMany({
          where: eq(travelTable.id, travel.id),
          with: {
            seats: {
              with: {
                seatCost: true,
              },
            },
          },
        });

        const minCost = sessions.reduce((min, session) => {
          const sessionMin = session.seats.reduce((sMin, seat) => {
            return seat.seatCost && seat.seatCost.cost < sMin ? seat.seatCost.cost : sMin;
          }, Infinity);
          return sessionMin < min ? sessionMin : min;
        }, Infinity);

        return { travel, minCost: minCost === Infinity ? 0 : minCost };
      })
    ).then((results) =>
      results
        .filter(({ minCost }) => {
          if (filters.minPrice !== undefined && minCost < filters.minPrice) return false;
          if (filters.maxPrice !== undefined && minCost > filters.maxPrice) return false;
          return true;
        })
        .map(({ travel }) => travel)
    );
  }

  const total = allTravels.length;
  const paginatedTravels = allTravels.slice(offset, offset + limit);
  const hasMore = offset + limit < total;

  return {
    travels: paginatedTravels.map((travel) => ({
      ...travel,
      subCategories: travel.subCategories.map((sc) => sc.subCategory),
      categories: travel.categories.map((c) => c.category),
    })) as any,
    total,
    hasMore,
  };
};
