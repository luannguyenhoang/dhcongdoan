"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PostListWithPagination = dynamic(() =>
  import("@/app/components/organisms/PostListWithPagination").then(
    (mod) => mod.PostListWithPagination
  )
);
const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);

export const ListPosts = ({
  handleRouter,
  type,
  categoryId
}: {
  handleRouter?: ({ selected }: { selected: number }) => void;
  type?: string;
  categoryId?: string;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);
  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PostListWithPagination
        type={type}
        categoryId={categoryId}
        handleRouter={handleRouter}
      />
    </>
  );
};
