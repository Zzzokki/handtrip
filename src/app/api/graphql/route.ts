import { type NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";
import { verifyToken } from "@/lib/utils/jwt";

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    const token = req.headers.get("authorization") || "";

    const payload = verifyToken(token.replace("Bearer ", ""));

    if (!payload) return {};

    return {
      user: {
        id: payload.id,
        role: payload.role,
      },
    };
  },
});

export { handler as GET, handler as POST };
