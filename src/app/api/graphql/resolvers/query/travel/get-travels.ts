import { QueryResolvers } from "@/api/types";
import { db, seatCostTable, seatTable, travelSessionTable, travelTable } from "@/database";
import { and, count, eq, exists, gte, ilike, inArray, lte, or, SQL } from "drizzle-orm";

export const getTravels: QueryResolvers["getTravels"] = async (_, { input }) => {
  const { page = 1, limit = 16, filters = {} } = input;

  const conditions: SQL[] = [];

  if (filters.companyId) conditions.push(eq(travelTable.companyId, filters.companyId));

  if (filters.query) {
    const searchTerm = `%${filters.query.toLowerCase().trim()}%`;

    const matchingDestinations = await db.query.destinationTable.findMany({
      where: (destination) => or(ilike(destination.name, searchTerm), ilike(destination.location, searchTerm)),
    });

    const matchingDestinationIds = matchingDestinations.map((d) => d.id);

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

    if (travelIds.length > 0) {
      conditions.push(inArray(travelTable.id, travelIds));
    } else {
      conditions.push(eq(travelTable.id, -1));
    }
  }

  if (filters.minDuration) conditions.push(gte(travelTable.duration, filters.minDuration));

  if (filters.maxDuration) conditions.push(lte(travelTable.duration, filters.maxDuration));

  const travels = await db.query.travelTable.findMany({
    where: (travel) => {
      const whereClauses: SQL[] = [...conditions];

      // Price filtering based on seat costs - must be done in where callback to access travel reference
      if (filters.minPrice !== undefined && filters.minPrice !== null) {
        whereClauses.push(
          exists(
            db
              .select()
              .from(travelSessionTable)
              .innerJoin(seatTable, eq(seatTable.travelSessionId, travelSessionTable.id))
              .innerJoin(seatCostTable, eq(seatCostTable.id, seatTable.seatCostId))
              .where(and(eq(travelSessionTable.travelId, travel.id), gte(seatCostTable.cost, filters.minPrice)))
          )
        );
      }

      if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
        whereClauses.push(
          exists(
            db
              .select()
              .from(travelSessionTable)
              .innerJoin(seatTable, eq(seatTable.travelSessionId, travelSessionTable.id))
              .innerJoin(seatCostTable, eq(seatCostTable.id, seatTable.seatCostId))
              .where(and(eq(travelSessionTable.travelId, travel.id), lte(seatCostTable.cost, filters.maxPrice)))
          )
        );
      }

      whereClauses.push(
        exists(
          db
            .select()
            .from(travelSessionTable)
            .where(and(gte(travelSessionTable.startDate, new Date()), eq(travelSessionTable.travelId, travel.id)))
        )
      );

      return and(...whereClauses);
    },
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

  // Build count query with same conditions
  const countConditions: SQL[] = [...conditions];

  if (filters.minPrice !== undefined && filters.minPrice !== null) {
    countConditions.push(
      exists(
        db
          .select()
          .from(travelSessionTable)
          .innerJoin(seatTable, eq(seatTable.travelSessionId, travelSessionTable.id))
          .innerJoin(seatCostTable, eq(seatCostTable.id, seatTable.seatCostId))
          .where(and(eq(travelSessionTable.travelId, travelTable.id), gte(seatCostTable.cost, filters.minPrice)))
      )
    );
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
    countConditions.push(
      exists(
        db
          .select()
          .from(travelSessionTable)
          .innerJoin(seatTable, eq(seatTable.travelSessionId, travelSessionTable.id))
          .innerJoin(seatCostTable, eq(seatCostTable.id, seatTable.seatCostId))
          .where(and(eq(travelSessionTable.travelId, travelTable.id), lte(seatCostTable.cost, filters.maxPrice)))
      )
    );
  }

  countConditions.push(
    exists(
      db
        .select()
        .from(travelSessionTable)
        .where(and(gte(travelSessionTable.startDate, new Date()), eq(travelSessionTable.travelId, travelTable.id)))
    )
  );

  const [{ count: totalTravels }] = await db
    .select({ count: count() })
    .from(travelTable)
    .where(and(...countConditions));

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
