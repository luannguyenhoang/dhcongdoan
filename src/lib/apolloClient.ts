import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

const API_GRAPHQL =
  process.env.NEXT_PUBLIC_API_GRAPHQL ||
  "https://noidung.dhcongdoan.vn/graphql";

const httpLink = new HttpLink({
  uri: API_GRAPHQL,
  fetch
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
});

export const { getClient, query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
    defaultOptions: {
      query: {
        errorPolicy: "all",
        fetchPolicy: "cache-first"
      }
    }
  });
});
