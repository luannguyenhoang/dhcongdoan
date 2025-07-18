import { ApolloClient, DocumentNode, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_API_GRAPHQL ||
    "https://noidung.dhcongdoan.vn/graphql",
  fetch
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all"
    }
  }
});

export const getData = async (query: DocumentNode, variables?: any) => {
  try {
    const response = await client.query({
      query,
      variables,
      fetchPolicy: "cache-first",
      errorPolicy: "all"
    });

    if (!response?.data) {
      return null;
    }

    return response.data;
  } catch (error: any) {
    return null;
  }
};
