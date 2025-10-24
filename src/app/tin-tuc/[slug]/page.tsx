import { GET_POST_BY_SLUG } from "@/app/api/graphQL/posts";
import DefaultLayout from "@/app/components/template/LayoutDefault";
import { getClient } from "@/lib/apolloClient";
import { replaceSeoRM } from "@/utils/seoRankMath";
import {
  extractMetaContent,
  generateMetadataFromFullHead
} from "@/utils/seoUtils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PageBanner = dynamic(() =>
  import("@/app/components/molecules/PageBanner").then((mod) => mod.PageBanner)
);
const LayoutPost = dynamic(() =>
  import("@/app/components/template/LayoutPost").then((mod) => mod.LayoutPost)
);
const ClientPost = dynamic(() =>
  import("@/app/post/ClientPost").then((mod) => mod.ClientPost)
);

async function getPost(slug: string) {
  try {
    const { data, errors } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { id: slug }
    });

    if (errors || !data?.post) {
      return null;
    }

    const categories = data.post.categories?.nodes || [];

    return {
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
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return { title: "Bài viết không tồn tại" };

  return {
    ...generateMetadataFromFullHead(
      post.seo?.fullHead || "",
      post.seo?.focusKeywords || ""
    )
  };
}

export const revalidate = 0;

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  const processedFullHead = replaceSeoRM(post?.seo?.fullHead || "");
  const jsonLdContent = extractMetaContent(
    processedFullHead,
    "application/ld+json"
  );

  return (
    <>
      <PageBanner
        title={post?.title || "Bài viết"}
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Tin tức", url: "/tin-tuc" },
          {
            label: post?.title || "Bài viết"
          }
        ]}
      />
      <DefaultLayout>
        <LayoutPost showForm={true} m="lg:my-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLdContent
            }}
          />
          <Suspense>
            <ClientPost post={post} />
          </Suspense>
        </LayoutPost>
      </DefaultLayout>
    </>
  );
}
