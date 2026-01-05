import { verifyPassword } from "@/lib/utils/password";
import { db } from "@/database";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "@/api/types";

export const loginAsAdmin: MutationResolvers["loginAsAdmin"] = async (_, { username, password }) => {
  const admin = await db.query.adminTable.findFirst({
    where: (table, { eq }) => eq(table.username, username),
  });

  if (!admin) throw new Error("Admin not found");

  const isPasswordValid = await verifyPassword(password, admin.passwordHash);

  if (!isPasswordValid) throw new Error("Invalid username or password");

  const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { token, admin };
};
