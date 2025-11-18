import { db, companyTable } from "@/database";
import { MutationResolvers } from "@/api/types";
import { eq } from "drizzle-orm";

export const updateCompany: MutationResolvers["updateCompany"] = async (_, { input }) => {
  const { id, ...rest } = input;

  const [updatedCompany] = await db.update(companyTable).set(rest).where(eq(companyTable.id, id)).returning();

  return updatedCompany;
};
