import { db, guideTable } from "@/database";
import { MutationResolvers } from "@/api/types";
import { eq } from "drizzle-orm";

export const deleteGuide: MutationResolvers["deleteGuide"] = async (_, { id }, context) => {
  const companyId = context.user?.id;

  if (!companyId || context.user?.role !== "company") {
    throw new Error("Unauthorized: Only companies can delete guides");
  }

  // Verify the guide belongs to this company
  const existingGuide = await db.query.guideTable.findFirst({
    where: (guide, { eq, and }) => and(eq(guide.id, id), eq(guide.companyId, companyId)),
  });

  if (!existingGuide) {
    throw new Error("Guide not found or unauthorized");
  }

  await db.delete(guideTable).where(eq(guideTable.id, id));

  return true;
};
