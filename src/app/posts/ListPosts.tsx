"use client";

import dynamic from "next/dynamic";

const PostListWithPagination = dynamic(() =>
  import("@/app/components/organisms/PostListWithPagination").then(
    (mod) => mod.PostListWithPagination
  )
);

export const ListPosts = ({
  handleRouter,
  type,
  categoryId,
}: {
  handleRouter?: ({ selected }: { selected: number }) => void;
  type?: string;
  categoryId?: string;
}) => {
  return (
    <PostListWithPagination
      type={type}
      categoryId={categoryId}
      handleRouter={handleRouter}
    />
  );
};
