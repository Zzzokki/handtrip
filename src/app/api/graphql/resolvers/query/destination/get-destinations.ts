import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getDestinations: QueryResolvers["getDestinations"] = async () => {
  const destinations = await db.query.destinationTable.findMany();
  return destinations;
};
