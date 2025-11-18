import { db, customerTable } from "@/database";
import { MutationResolvers } from "@/api/types";
import { eq } from "drizzle-orm";

export const deleteCustomer: MutationResolvers["deleteCustomer"] = async (_, { id }) => {
  const [deletedCustomer] = await db.delete(customerTable).where(eq(customerTable.id, id)).returning();

  return deletedCustomer;
};
