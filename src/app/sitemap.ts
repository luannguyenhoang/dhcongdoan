import { GET_SITEMAP } from "@/app/api/graphQL/posts";
import { getClient } from "@/lib/apolloClient";
import { menus, TMenus } from "@/router/router";
import type { MetadataRoute } from "next";

const API_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://dhcongdoan.vn";

const getAllPaths = (menus: TMenus): MetadataRoute.Sitemap => {
  const paths: MetadataRoute.Sitemap = [];

  const collectPaths = (menuList: TMenus) => {
    for (const menu of menuList) {
      if (menu.path && menu.path !== "#") {
        paths.push({ url: `${API_URL}${menu.path}` });
      }
    }
  };

  collectPaths(menus);
  return paths;
};

async function getPostPaths(): Promise<MetadataRoute.Sitemap> {
  try {
    const allPosts: { slug: string }[] = [];
    let hasNextPage = true;
    let endCursor: string | null = null;
    const batchSize = 100;

    while (hasNextPage) {
      const { data }: any = await getClient().query({
        query: GET_SITEMAP,
        variables: {
          first: batchSize,
          after: endCursor
        },
        fetchPolicy: "no-cache",
        errorPolicy: "all"
      });

      const posts = data?.posts?.nodes;
      const pageInfo: any = data?.posts?.pageInfo;

      allPosts.push(...posts);

      hasNextPage = pageInfo?.hasNextPage || false;
      endCursor = pageInfo?.endCursor || null;
    }

    return allPosts.map((post: { slug: string }) => ({
      url: `${API_URL}/${post.slug}`
    }));
  } catch (error) {
    return [];
  }
}
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = getAllPaths(menus);
  try {
    const postPaths = await getPostPaths();
    return [...staticPaths, ...postPaths];
  } catch (error) {
    return staticPaths;
  }
}
