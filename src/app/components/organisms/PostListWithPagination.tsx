"use client";

import NextIcon from "@/icons/NextIcon";
import PreviousIcon from "@/icons/PreviousIcon";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import xss from "xss";

const CardBlogVert = dynamic(() =>
  import("@/app/components/atoms/BlogVertCard").then((mod) => mod.CardBlogVert)
);
const LoadingListPost = dynamic(() =>
  import("@/app/components/atoms/LoadingListPost").then(
    (mod) => mod.LoadingListPost
  )
);
const StyledPaginate = dynamic(() =>
  import("@/app/components/atoms/StyledPaginate").then(
    (mod) => mod.StyledPaginate
  )
);

export const PostListWithPagination = ({
  type,
  categoryId,
  handleRouter
}: {
  type?: string;
  categoryId?: string;
  handleRouter?: ({ selected }: { selected: number }) => void;
}) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const searchTerm = searchParams?.get("search") || "";
  const first = 10;

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      try {
        let url = `/api/posts?&size=${first}&offset=${(page - 1) * first}`;

        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }

        if (categoryId) {
          url += `&categoryId=${encodeURIComponent(categoryId)}`;
        }

        const res = await fetch(url, {
          next: { revalidate: 1 }
        });

        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }

        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts, totalPosts } = data;

        if (posts?.length) {
          setPosts(posts);
          setTotalPosts(totalPosts);
        } else {
          setPosts([]);
          setTotalPosts("0");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setTotalPosts("0");
      }

      setIsLoading(false);
    };

    getPosts();
  }, [page, searchTerm, type, categoryId, first]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    if (handleRouter) {
      let url = `/${type}?page=${selectedItem.selected + 1}`;

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      if (categoryId) {
        url += `&categoryId=${encodeURIComponent(categoryId)}`;
      } else if (type) {
        url += `&category=${encodeURIComponent(type)}`;
      }

      router.push(url);
    }
  };

  return (
    <div>
      {!isLoading && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
            {posts?.map((post: any, index: number) => {
              return (
                <CardBlogVert
                  date={post?.date}
                  key={index}
                  title={xss(post?.title)}
                  desc={xss(post?.excerpt)}
                  image={post?.featured_image || ""}
                  path={
                    categoryId === "dGVybTox"
                      ? `/tin-tuc/${post?.slug}`
                      : categoryId === "dGVybToyODU="
                        ? `/thong-tin-tuyen-sinh/${post?.slug}`
                        : `/bai-viet/${post?.slug}`
                  }
                />
              );
            })}
          </div>

          {posts?.length > 0 && (
            <div className="pt-8 flex justify-center">
              <StyledPaginate
                className="paginate"
                previousLabel={<PreviousIcon />}
                nextLabel={<NextIcon />}
                pageCount={Math.ceil(Number(totalPosts) / first)}
                onPageChange={handleRouter || handlePageChange}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                activeClassName="active"
                forcePage={Number(page) - 1}
                previousClassName={page === 1 ? "hidden" : ""}
                nextClassName={
                  page >= Math.ceil(Number(totalPosts) / first) ? "hidden" : ""
                }
                renderOnZeroPageCount={null}
              />
            </div>
          )}

          {posts?.length === 0 && (
            <div className="grid place-items-center h-[40vh]">
              {searchTerm ? (
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto mb-4 text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <p className="text-xl font-medium mb-2">
                    Không tìm thấy kết quả nào phù hợp
                  </p>
                  <p className="text-gray-500">
                    Vui lòng thử lại với từ khóa khác
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-medium">
                    Dữ liệu đang được chúng tôi cập nhập
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {isLoading && <LoadingListPost count={10} col={2} />}
    </div>
  );
};
