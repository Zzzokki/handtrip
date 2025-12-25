import { MutationResolvers } from "@/api/types";
import { db, travelTable, travelSessionTable, seatTable, seatCostTable } from "@/database";
import { eq } from "drizzle-orm";

export const deleteTravel: MutationResolvers["deleteTravel"] = async (_, { id }, context) => {
  const { user } = context;

  if (!user || user.role !== "company") {
    throw new Error("Зөвшөөрөлгүй: Зөвхөн компаниуд аялал устгах боломжтой");
  }

  // Check if travel exists and belongs to this company
  const existingTravel = await db.query.travelTable.findFirst({
    where: eq(travelTable.id, id),
    with: {
      destination: true,
      company: true,
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
    },
  });

  if (!existingTravel) {
    throw new Error("Аялал олдсонгүй");
  }

  if (existingTravel.companyId !== user.id) {
    throw new Error("Зөвшөөрөлгүй: Та зөвхөн өөрийн аялалыг устгах боломжтой");
  }

  // Delete related data (cascade delete)
  // First, delete seat costs for all seats in all sessions
  for (const session of existingTravel.travelSessions) {
    for (const seat of session.seats) {
      if (seat.seatCostId) {
        await db.delete(seatCostTable).where(eq(seatCostTable.id, seat.seatCostId));
      }
    }
    // Delete seats for this session
    await db.delete(seatTable).where(eq(seatTable.travelSessionId, session.id));
  }

  // Delete all sessions for this travel
  await db.delete(travelSessionTable).where(eq(travelSessionTable.travelId, id));

  // Finally, delete the travel itself
  await db.delete(travelTable).where(eq(travelTable.id, id));

  return existingTravel as any;
};
