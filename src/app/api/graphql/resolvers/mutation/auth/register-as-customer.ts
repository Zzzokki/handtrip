import { saltAndHashPassword } from "@/lib/utils/password";
import { generateToken } from "@/lib/utils/jwt";
import { customerTable, db } from "@/database";
import { MutationResolvers } from "@/api/types";

export const registerAsCustomer: MutationResolvers["registerAsCustomer"] = async (_, { input }) => {
  const existingUser = await db.query.customerTable.findFirst({
    where: (table, { eq, or }) => or(eq(table.username, input.username), eq(table.email, input.email)),
  });

  if (existingUser) throw new Error("Username or email already exists");

  const passwordHash = await saltAndHashPassword(input.password);

  const [customer] = await db
    .insert(customerTable)
    .values({
      username: input.username,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      email: input.email,
      passwordHash,
    })
    .returning();

  const token = generateToken({
    id: customer.id.toString(),
    email: customer.email,
    type: "customer",
  });

  return { token, customer };
};
