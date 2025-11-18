import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getSubCategories: QueryResolvers["getSubCategories"] = async () => {
  const subCategories = await db.query.subCategoryTable.findMany({});
  return subCategories;
};
