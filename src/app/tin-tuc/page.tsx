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
    router.push(`/tin-tuc?page=${selected + 1}`);
  };

  return (
    <div>
      <PageBanner
        title="Tin tức"
        backgroundImage="/image7.png"
        breadcrumbs={[{ label: "Trang chủ", url: "/" }, { label: "Tin tức" }]}
      />
      <div className="py-24">
        <LayoutBottom showNewPost={true} showForm={true}>
          <div>
            <ListPosts
              handleRouter={handleRouter}
              categoryId="dGVybTox"
              type="tin-tuc"
            />
          </div>
        </LayoutBottom>
      </div>
    </div>
  );
}
