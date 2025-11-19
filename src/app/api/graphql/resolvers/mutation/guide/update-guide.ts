import { db, guideTable } from "@/database";
import { MutationResolvers } from "@/api/types";
import { eq } from "drizzle-orm";

export const updateGuide: MutationResolvers["updateGuide"] = async (_, { id, input }, context) => {
  const companyId = context.user?.id;

  if (!companyId || context.user?.type !== "company") {
    throw new Error("Unauthorized: Only companies can update guides");
  }

  // Verify the guide belongs to this company
  const existingGuide = await db.query.guideTable.findFirst({
    where: (guide, { eq, and }) => and(eq(guide.id, id), eq(guide.companyId, companyId)),
  });

  if (!existingGuide) {
    throw new Error("Guide not found or unauthorized");
  }

  const [guide] = await db
    .update(guideTable)
    .set({
      ...(input.name && { name: input.name }),
      ...(input.email && { email: input.email }),
      ...(input.phoneNumber && { phoneNumber: input.phoneNumber }),
      ...(input.profileImage && { profileImage: input.profileImage }),
    })
    .where(eq(guideTable.id, id))
    .returning();

  return guide;
};
