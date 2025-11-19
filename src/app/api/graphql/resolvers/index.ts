import { TimestampResolver } from "graphql-scalars";
import { db } from "@/database";
import * as Mutation from "./mutation";
import * as Query from "./query";

export const resolvers = {
  // Scalars
  Timestamp: TimestampResolver,

  // Mutations and Queries
  Query,
  Mutation,
};
