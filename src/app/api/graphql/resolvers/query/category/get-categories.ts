import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getCategories: QueryResolvers["getCategories"] = async () => {
  const categories = db.query.categoryTable.findMany({});
  return categories;
};
