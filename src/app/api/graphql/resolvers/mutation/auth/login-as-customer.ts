
import { verifyPassword } from "@/lib/utils/password";
import { db } from "../../../database";
import { MutationResolvers } from "../../../types/generated.ts/types.generated";

export const loginAsCustomer: MutationResolvers["loginAsCustomer"] = async (_, { username, password }) => {
  const customer = await db.query.customerTable.findFirst({
    where: (table, { eq }) => eq(table.username, username),
  });

  if (!customer) throw new Error("Customer not found");

  const isPasswordValid = await verifyPassword(password, customer.passwordHash);

  if (!isPasswordValid) throw new Error("Invalid username or password");

  return customer
}