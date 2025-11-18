import { saltAndHashPassword } from "@/lib/utils/password";
import { db, customerTable } from "@/database";
import { MutationResolvers } from "@/api/types";

export const createCustomer: MutationResolvers["createCustomer"] = async (_, { input }) => {
  // Hash password
  const passwordHash = await saltAndHashPassword(input.password);
  const [customer] = await db
    .insert(customerTable)
    .values({
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      email: input.email,
      username: input.username,
      passwordHash, // In a real application, make sure to hash the password before storing it
    })
    .returning();

  return customer;
};
