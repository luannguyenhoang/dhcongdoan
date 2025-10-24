"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListPosts = dynamic(() =>
  import("@/app/posts/ListPosts").then((mod) => mod.ListPosts)
);
const LayoutBottom = dynamic(() =>
  import("@/app/components/template/LayoutBottom").then(
    (mod) => mod.LayoutBottom
  )
);
const PageBanner = dynamic(() =>
  import("@/app/components/molecules/PageBanner").then((mod) => mod.PageBanner)
);

export default function Page() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/thong-tin-tuyen-sinh?page=${selected + 1}`);
  };

  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  return (
    <div>
      <PageBanner
        title="Thông tin tuyển sinh"
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Thông tin tuyển sinh" }
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
