import { GET_POST_BY_SLUG } from "@/app/api/graphQL/posts";
import { getClient } from "@/lib/apolloClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Slug parameter is required" },
      { status: 400 }
    );
  }

  try {
    const { data, errors } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { id: slug }
    });

    if (errors || !data?.post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const categories = data.post.categories?.nodes || [];

    const post = {
      id: data.post.id,
      title: data.post.title,
      slug: data.post.slug,
      date: data.post.date,
      content: data.post.content,
      featuredImage: data.post.featuredImage?.node?.mediaItemUrl || "",
      categories: categories.map((cat: any) => ({
        slug: cat.slug
      })),
      seo: {
        fullHead: data.post.seo?.fullHead || "",
        title: data.post.seo?.title || "",
        focusKeywords: data.post.seo?.focusKeywords || ""
      }
    };

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
