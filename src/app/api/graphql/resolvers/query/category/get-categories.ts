import { QueryResolvers } from "@/api/types";
import { db } from "@/database";
import { subCategoryTable } from "@/database/schemas";

export const getCategories: QueryResolvers["getCategories"] = async () => {
  const categories = await db.query.categoryTable.findMany({
    with: {
      subCategories: true,
    },
  });
  return categories;
};
