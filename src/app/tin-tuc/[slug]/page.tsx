import { GET_POST_BY_SLUG } from "@/app/api/graphQL/posts";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import DefaultLayout from "@/app/components/template/LayoutDefault";
import { LayoutPost } from "@/app/components/template/LayoutPost";
import { Post } from "@/app/post/Post";
import { getClient } from "@/lib/apolloClient";
import { replaceSeoRM } from "@/utils/seoRankMath";
import {
  extractMetaContent,
  generateMetadataFromFullHead,
} from "@/utils/seoUtils";
import { Metadata } from "next";
import { Suspense } from "react";

async function getPost(slug: string) {
  try {
    const { data, errors } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { id: slug },
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
        slug: cat.slug,
      })),

      seo: {
        fullHead: data.post.seo?.fullHead || "",
        title: data.post.seo?.title || "",
        focusKeywords: data.post.seo?.focusKeywords || "",
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Bài viết không tồn tại" };

  return {
    ...generateMetadataFromFullHead(post.seo.fullHead, post.seo.focusKeywords),
  };
}
export const revalidate = 60;
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const processedFullHead = replaceSeoRM(post?.seo.fullHead);
  const jsonLdContent = extractMetaContent(
    processedFullHead,
    "application/ld+json"
  );

  return (
    <>
      <PageBanner
        title={post?.title || "Bài viết"}
        backgroundImage={post?.featuredImage || "/image7.png"}
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Tin tức", url: "/tin-tuc" },
          {
            label: post?.title || "Bài viết",
          },
        ]}
      />
      <DefaultLayout>
        <LayoutPost showForm={true} m="lg:mt-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLdContent,
            }}
          />
          <Suspense>
            <Post post={post} />
          </Suspense>
        </LayoutPost>
      </DefaultLayout>
    </>
  );
}
