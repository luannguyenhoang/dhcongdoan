"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { LayoutBottom } from "@/app/components/template/LayoutBottom";
import FormPopup from "@/app/components/molecules/FormPopup";
import { useEffect, useState } from "react";

const ListPosts = dynamic(() =>
  import("@/app/posts/ListPosts").then((mod) => mod.ListPosts)
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
        backgroundImage="/image11.webp"
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
