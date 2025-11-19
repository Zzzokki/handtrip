import { db, guideTable } from "@/database";
import { MutationResolvers } from "@/api/types";

export const createGuide: MutationResolvers["createGuide"] = async (_, { input }, context) => {
  const companyId = context.user?.id;

  if (!companyId || context.user?.type !== "company") {
    throw new Error("Unauthorized: Only companies can create guides");
  }

  const [guide] = await db
    .insert(guideTable)
    .values({
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      profileImage: input.profileImage,
      companyId,
    })
    .returning();

  return guide;
};
