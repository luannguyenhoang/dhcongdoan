"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { LayoutBottom } from "@/app/components/template/LayoutBottom";

const ListPosts = dynamic(() =>
  import("@/app/posts/ListPosts").then((mod) => mod.ListPosts)
);

export default function Page() {
  const router = useRouter();

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/thong-tin-tuyen-sinh?page=${selected + 1}`);
  };

  return (
    <div>
      <PageBanner
        title="Thông tin tuyển sinh"
        backgroundImage="/image11.webp"
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Thông tin tuyển sinh" },
        ]}
      />
      <div className="py-24">
        <LayoutBottom showForm={true} showNewPost={true} showSearchBar={true}>
          <div>
            <ListPosts
              handleRouter={handleRouter}
              categoryId="dGVybToyODU="
              type="thong-tin-tuyen-sinh"
            />
          </div>
        </LayoutBottom>
      </div>
    </div>
  );
}
