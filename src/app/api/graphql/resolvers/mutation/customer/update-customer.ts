import { db, customerTable } from "@/database";
import { MutationResolvers } from "@/api/types";
import { eq } from "drizzle-orm";

export const updateCustomer: MutationResolvers["updateCustomer"] = async (_, { input }) => {
  const { id, ...rest } = input;

  const [updatedCompany] = await db.update(customerTable).set(rest).where(eq(customerTable.id, id)).returning();

  return updatedCompany;
};
