import { saltAndHashPassword } from "@/lib/utils/password";
import { db, companyTable } from "@/database";
import { MutationResolvers } from "@/api/types";

export const createCompany: MutationResolvers["createCompany"] = async (_, { input }) => {
  const passwordHash = await saltAndHashPassword(input.password);
  const [company] = await db
    .insert(companyTable)
    .values({
      name: input.name,
      logo: input.logo,
      coverImage: input.coverImage,
      phoneNumber: input.phoneNumber,
      email: input.email,
      description: input.description,
      username: input.username,
      passwordHash, // In a real application, make sure to hash the password before storing it
    })
    .returning();
  return company;
};
