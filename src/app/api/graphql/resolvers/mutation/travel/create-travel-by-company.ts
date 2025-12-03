import { MutationResolvers } from "@/api/types";
import { db, travelTable, agendaTable, travelSessionTable, subCategoryToTravelTable, seatTable, seatCostTable } from "@/database";

export const createTravelByCompany: MutationResolvers["createTravelByCompany"] = async (_, { input }, { user }) => {
  if (!user) throw new Error("Unauthenticated");

  if (user.role !== "company") throw new Error("Unauthorized");

  const { name, description, coverImage, gallery, duration, totalSeatNumber, agendas, travelSessions, destinationId, subCategoryIds } = input;

  const [{ id: travelId }] = await db
    .insert(travelTable)
    .values({
      name,
      description,
      coverImage,
      gallery,
      duration,
      totalSeatNumber,
      companyId: user.id,
      destinationId,
    })
    .returning();

  const agendaItems = agendas.map((item) => ({ ...item, travelId }));

  await db.insert(agendaTable).values(agendaItems);

  const travelSessionItems = travelSessions.map((session) => ({
    travelId,
    guideId: session.guideId,
    startDate: new Date(session.startDate),
    endDate: new Date(session.endDate),
  }));

  const createdTravelSessions = await db.insert(travelSessionTable).values(travelSessionItems).returning();

  for (let i = 0; i < createdTravelSessions.length; i++) {
    const [{ id: seatCostId }] = await db.insert(seatCostTable).values({ cost: travelSessions[i].seatCost }).returning();

    await db.insert(seatTable).values(
      Array.from({ length: totalSeatNumber }).map(() => ({
        travelSessionId: createdTravelSessions[i].id,
        seatCostId,
      }))
    );
  }

  const subCategoryInserts = subCategoryIds.map((subCategoryId) => ({
    travelId,
    subCategoryId,
  }));

  await db.insert(subCategoryToTravelTable).values(subCategoryInserts);

  const travel = await db.query.travelTable.findFirst({
    where: (table, { eq }) => eq(table.id, travelId),
    with: {
      company: true,
      subCategories: { with: { subCategory: true } },
      categories: { with: { category: true } },
      travelSessions: { with: { guide: true } },
      agenda: true,
      destination: true,
    },
  });

  if (!travel) throw new Error("Travel creation failed");

  return {
    ...travel,
    subCategories: travel.subCategories.map((sc) => sc.subCategory),
    categories: travel.categories.map((c) => c.category),
  };
};
