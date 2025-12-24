import { QueryResolvers } from "@/api/types";
import { db, destinationTable, travelSessionTable, travelTable } from "@/database";
import { and, count, eq, exists, gte, ilike, inArray, lte, or, SQL } from "drizzle-orm";

export const getTravels: QueryResolvers["getTravels"] = async (_, { input }) => {
  const { page = 1, limit = 16, filters = {} } = input;

  const conditions: SQL[] = [];

  // Enhanced search: search in travel name, description, and destination name
  if (filters.query) {
    const searchTerm = `%${filters.query.toLowerCase().trim()}%`;

    // Get destinations that match the search query
    const matchingDestinations = await db.query.destinationTable.findMany({
      where: (destination) => or(ilike(destination.name, searchTerm), ilike(destination.location, searchTerm)),
    });

    const matchingDestinationIds = matchingDestinations.map((d) => d.id);

    // Search in travel name, description, or matching destinations
    if (matchingDestinationIds.length > 0) {
      conditions.push(or(ilike(travelTable.name, searchTerm), ilike(travelTable.description, searchTerm), inArray(travelTable.destinationId, matchingDestinationIds))!);
    } else {
      conditions.push(or(ilike(travelTable.name, searchTerm), ilike(travelTable.description, searchTerm))!);
    }
  }

  if (filters.destinationIds) conditions.push(inArray(travelTable.destinationId, filters.destinationIds));

  if (filters.subCategoryIds && filters.subCategoryIds.length > 0) {
    const joins = await db.query.subCategoryToTravelTable.findMany({
      where: (table, { inArray }) => inArray(table.subCategoryId, filters.subCategoryIds!),
    });

    const travelIds = joins.map((join) => join.travelId);

    // Only add the condition if we found matching travels
    if (travelIds.length > 0) {
      conditions.push(inArray(travelTable.id, travelIds));
    } else {
      // If no travels match the subcategories, return empty results
      conditions.push(eq(travelTable.id, -1));
    }
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

  // Count total travels with the same filter conditions
  const [{ count: totalTravels }] = await db
    .select({ count: count() })
    .from(travelTable)
    .where(
      and(
        ...conditions,
        exists(
          db
            .select()
            .from(travelSessionTable)
            .where(and(gte(travelSessionTable.startDate, new Date()), eq(travelSessionTable.travelId, travelTable.id)))
        )
      )
    );

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
