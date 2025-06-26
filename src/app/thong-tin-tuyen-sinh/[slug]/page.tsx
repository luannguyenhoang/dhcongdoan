import { GET_POST_BY_SLUG } from "@/app/api/graphQL/posts";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import DefaultLayout from "@/app/components/template/LayoutDefault";
import { LayoutPost } from "@/app/components/template/LayoutPost";
import { ClientPost } from "@/app/post/ClientPost";
import { getClient } from "@/lib/apolloClient";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

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

  return (
    <>
      <PageBanner
        title={post?.title || "Thông tin tuyển sinh"}
        backgroundImage={post?.featuredImage || "/image7.png"}
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Thông tin tuyển sinh", url: "/thong-tin-tuyen-sinh" },
          { label: post?.title || "Chi tiết" }
        ]}
      />
      <DefaultLayout>
        <LayoutPost showForm={true} m="lg:my-20 mb-20">
          <ClientPost post={post} />
        </LayoutPost>
      </DefaultLayout>
    </>
  );
}
