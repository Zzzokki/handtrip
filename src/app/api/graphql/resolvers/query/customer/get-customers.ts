import { QueryResolvers } from "../../../types/generated/types.generated";
import { db } from "../../../database";

export const getCustomers: QueryResolvers["getCustomers"] = async () => {
  return await db.query.customerTable.findMany({
    orderBy: (customers, { desc }) => [desc(customers.createdAt)],
  });
};
