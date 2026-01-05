import { MutationResolvers } from "@/api/types";
import { db, travelTable, agendaTable, subCategoryToTravelTable } from "@/database";
import { eq } from "drizzle-orm";

export const updateTravel: MutationResolvers["updateTravel"] = async (_, { id, input }, context) => {
  const { user } = context;

  if (!user || user.role !== "company") {
    throw new Error("Зөвшөөрөлгүй: Зөвхөн компаниуд аялал засах боломжтой");
  }

  const existingTravel = await db.query.travelTable.findFirst({
    where: eq(travelTable.id, id),
  });

  if (!existingTravel) {
    throw new Error("Аялал олдсонгүй");
  }

  if (existingTravel.companyId !== user.id) {
    throw new Error("Зөвшөөрөлгүй: Та зөвхөн өөрийн аялалыг засах боломжтой");
  }

  const { name, description, coverImage, gallery, duration, totalSeatNumber, agendas, destinationId, subCategoryIds } = input;

  // Update the travel
  await db
    .update(travelTable)
    .set({
      name,
      description,
      coverImage,
      gallery,
      duration,
      totalSeatNumber,
      destinationId,
      updatedAt: new Date(),
    })
    .where(eq(travelTable.id, id));

  // Update agendas - delete old ones and insert new ones
  await db.delete(agendaTable).where(eq(agendaTable.travelId, id));

  const agendaItems = agendas.map((item) => ({ ...item, travelId: id }));
  await db.insert(agendaTable).values(agendaItems);

  // Update subcategories - delete old associations and insert new ones
  await db.delete(subCategoryToTravelTable).where(eq(subCategoryToTravelTable.travelId, id));

  const subCategoryInserts = subCategoryIds.map((subCategoryId) => ({
    travelId: id,
    subCategoryId,
  }));
  await db.insert(subCategoryToTravelTable).values(subCategoryInserts);

  // Fetch the updated travel with relations
  const updatedTravel = await db.query.travelTable.findFirst({
    where: eq(travelTable.id, id),
    with: {
      destination: true,
      company: true,
      categories: { with: { category: true } },
      subCategories: { with: { subCategory: true } },
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
    },
  });

  if (!updatedTravel) {
    throw new Error("Аялал шинэчлэхэд алдаа гарлаа");
  }

  return {
    ...updatedTravel,
    subCategories: updatedTravel.subCategories.map((sc) => sc.subCategory),
    categories: updatedTravel.categories.map((c) => c.category),
  };
};
