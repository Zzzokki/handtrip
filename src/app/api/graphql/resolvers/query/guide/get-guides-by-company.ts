import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getGuidesByCompany: QueryResolvers["getGuidesByCompany"] = async (_, __, { user }) => {
  console.log(user);
  if (!user) throw new Error("Unauthenticated");

  if (user.role !== "company") throw new Error("Unauthorized");

  const guides = await db.query.guideTable.findMany({
    where: (table, { eq }) => eq(table.companyId, user.id),
  });

  return guides;
};
