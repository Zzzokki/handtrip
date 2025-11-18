"use client";

import { PropsWithChildren, useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const client: ApolloClient<NormalizedCacheObject> = useMemo(() => {
    const httpLink = createHttpLink({ uri: "/api/graphql" });

    const authLink = setContext(async (_, { headers }) => ({ headers }));

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
