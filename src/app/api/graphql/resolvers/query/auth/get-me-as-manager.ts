import { db } from "@/database";
import { QueryResolvers } from "@/api/types";
import { eq } from "drizzle-orm";
import { managerTable } from "@/database";

export const getMeAsManager: QueryResolvers["getMeAsManager"] = async (_, __, { user }) => {
  if (!user || user.role !== "manager") {
    throw new Error("Unauthorized");
  }

  const manager = await db.query.managerTable.findFirst({
    where: eq(managerTable.id, user.id),
    with: {
      company: true,
    },
  });

  if (!manager) throw new Error("Manager not found");

  return manager;
};
