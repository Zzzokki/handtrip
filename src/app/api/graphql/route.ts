import { type NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
