import { db } from "@/database";
import { QueryResolvers } from "@/api/types";
import { eq } from "drizzle-orm";
import { adminTable } from "@/database";

export const getMeAsAdmin: QueryResolvers["getMeAsAdmin"] = async (_, __, { user }) => {
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const admin = await db.query.adminTable.findFirst({
    where: eq(adminTable.id, user.id),
  });

  if (!admin) throw new Error("Admin not found");

  return admin;
};
