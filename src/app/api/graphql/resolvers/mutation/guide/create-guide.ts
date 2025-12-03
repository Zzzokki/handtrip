import { db, guideTable } from "@/database";
import { MutationResolvers } from "@/api/types";

export const createGuide: MutationResolvers["createGuide"] = async (_, { input }, { user }) => {
  if (!user) throw new Error("Unauthenticated");

  if (user.role !== "company") throw new Error("Unauthorized");

  const [guide] = await db
    .insert(guideTable)
    .values({
      companyId: user.id,
      name: input.name,
      description: input.description,
      email: input.email,
      phoneNumber: input.phoneNumber,
      profileImage: input.profileImage,
    })
    .returning();

  return guide;
};
