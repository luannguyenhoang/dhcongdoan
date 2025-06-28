import { ApolloClient, DocumentNode, InMemoryCache } from "@apollo/client";
import { SeoData } from "@/types/types";

/**
 * @param query
 * @param nodeKey
 * @param extraData
 * @param variables
 * @returns
 */
export async function getSeoData(
  query: DocumentNode,
  nodeKey: string,
  extraData: string[] = [],
  variables?: Record<string, any>
): Promise<SeoData> {
  const client = new ApolloClient({
    uri:
      process.env.NEXT_PUBLIC_API_GRAPHQL ||
      "https://noidung.dhcongdoan.vn/graphql",
    ssrMode: true,
    cache: new InMemoryCache()
  });

  try {
    const response = await client.query({
      query,
      variables,
      fetchPolicy: "network-only"
    });
    let nodeData;
    nodeData = response?.data?.[nodeKey] || {};

    const result: SeoData = {
      seo: nodeData?.seo || {}
    };

    if (extraData.length > 0) {
      extraData.forEach((key) => {
        if (nodeData[key]) {
          result[key] = nodeData[key];
        }
      });
    }

    return result;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      seo: {}
    };
  }
}
