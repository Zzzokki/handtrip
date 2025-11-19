import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getCompany: QueryResolvers["getCompany"] = async (_, { id }) => {
  const company = await db.query.companyTable.findFirst({
    where: (company, { eq }) => eq(company.id, id),
  });

  if (!company) throw new Error("Company not found");

  return company;
};
