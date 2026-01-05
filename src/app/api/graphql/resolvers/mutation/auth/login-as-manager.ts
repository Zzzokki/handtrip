import { verifyPassword } from "@/lib/utils/password";
import { db } from "@/database";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "@/api/types";

export const loginAsManager: MutationResolvers["loginAsManager"] = async (_, { username, password }) => {
  const manager = await db.query.managerTable.findFirst({
    where: (table, { eq }) => eq(table.username, username),
    with: {
      company: true,
    },
  });

  if (!manager) throw new Error("Manager not found");

  const isPasswordValid = await verifyPassword(password, manager.passwordHash);

  if (!isPasswordValid) throw new Error("Invalid username or password");

  const token = jwt.sign({ id: manager.id, role: "manager" }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { token, manager };
};
