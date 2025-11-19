import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getCompanies: QueryResolvers["getCompanies"] = async () => {
  const companies = await db.query.companyTable.findMany();
  return companies;
};
