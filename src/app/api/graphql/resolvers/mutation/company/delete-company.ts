import { db, companyTable } from "@/database";
import { MutationResolvers } from "@/api/types";
import { eq } from "drizzle-orm";

export const deleteCompany: MutationResolvers["deleteCompany"] = async (_, { id }) => {
  const [deletedCompany] = await db.delete(companyTable).where(eq(companyTable.id, id)).returning();

  return deletedCompany;
};
