import { GET_SAME_POSTS } from "@/app/api/graphQL/posts";
import { getClient } from "@/lib/apolloClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const size = parseInt(searchParams.get("size") || "3", 10);
  const categories = searchParams.getAll("categories");
  const exclude = searchParams.get("exclude");

  if (!categories.length) {
    return NextResponse.json({ error: "Missing categories" }, { status: 400 });
  }

  try {
    const allPostsPromises = categories.map(async (category) => {
      const variables = { category, size: size * 2 };

      try {
        const { data } = await getClient().query({
          query: GET_SAME_POSTS,
          variables
        });

        return data?.posts?.nodes || [];
      } catch (error) {
        console.error(`Error fetching posts for category ${category}:`, error);
        return [];
      }
    });

    const allPostsArrays = await Promise.all(allPostsPromises);

    let allPosts: any[] = [];
    allPostsArrays.forEach((posts) => {
      allPosts = [...allPosts, ...posts];
    });

    const uniquePosts = allPosts
      .filter((post: any) => post.slug !== exclude)
      .reduce((unique: any[], post: any) => {
        const exists = unique.some((p) => p.slug === post.slug);
        if (!exists) {
          unique.push(post);
        }
        return unique;
      }, []);

    if (!uniquePosts.length) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }

    const limitedPosts = uniquePosts.slice(0, size);

    const posts = limitedPosts.map((node: any) => ({
      title: node.title,
      slug: node.slug,
      date: node.date,
      excerpt: node.excerpt,
      featured_image:
        node.featuredImage?.node?.mediaItemUrl || "/no-image.jpeg",
      categories: node.categories.nodes.map((cat: any) => cat.slug)
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
