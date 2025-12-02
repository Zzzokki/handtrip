import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getGuideByCompany: QueryResolvers["getGuideByCompany"] = async (_, { id }, { user }) => {
  if (!user) throw new Error("Unauthenticated");

  if (user.role !== "company") throw new Error("Unauthorized");

  const guide = await db.query.guideTable.findFirst({
    where: (table, { eq, and }) => and(eq(table.id, id), eq(table.companyId, user.id)),
  });

  if (!guide) throw new Error("Guide not found");

  return guide;
};
