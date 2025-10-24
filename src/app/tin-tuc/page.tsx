"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListPosts = dynamic(() =>
  import("@/app/posts/ListPosts").then((mod) => mod.ListPosts)
);
const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);
const PageBanner = dynamic(() =>
  import("@/app/components/molecules/PageBanner").then((mod) => mod.PageBanner)
);
const LayoutBottom = dynamic(() =>
  import("@/app/components/template/LayoutBottom").then(
    (mod) => mod.LayoutBottom
  )
);

export default function Page() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/tin-tuc?page=${selected + 1}`);
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
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title="Tin tức"
        breadcrumbs={[{ label: "Trang chủ", url: "/" }, { label: "Tin tức" }]}
      />
      <div className="py-24">
        <LayoutBottom showSearchBar={true} showNewPost={true} showForm={true}>
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
