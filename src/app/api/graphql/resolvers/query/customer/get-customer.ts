import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getCustomer: QueryResolvers["getCustomer"] = async (_, { id }) => {
  const customer = await db.query.customerTable.findFirst({
    where: (customer, { eq }) => eq(customer.id, id),
  });

  if (!customer) throw new Error("Customer not found");

  return customer;
};
