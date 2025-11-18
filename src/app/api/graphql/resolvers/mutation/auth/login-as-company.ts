import { verifyPassword } from "@/lib/utils/password";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "@/api/types";
import { db } from "@/database";

export const loginAsCompany: MutationResolvers["loginAsCompany"] = async (_, { username, password }) => {
  const company = await db.query.companyTable.findFirst({
    where: (table, { eq }) => eq(table.username, username),
  });

  if (!company) throw new Error("Company not found");

  const isPasswordValid = await verifyPassword(password, company.passwordHash);

  if (!isPasswordValid) throw new Error("Invalid username or password");

  const token = jwt.sign({ id: company.id, role: "company" }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { token, company };
};
