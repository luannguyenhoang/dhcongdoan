"use client";

import { GET_LATEST_POSTS } from "@/app/api/graphQL/posts";
import { getData } from "@/lib/getData";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
  categories: {
    nodes: {
      slug: string;
      name: string;
    }[];
  };
}

export const NewPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const data = await getData(GET_LATEST_POSTS, { count: 5 });
        if (!data) {
          throw new Error("No data returned from API");
        }
        setPosts(data?.posts?.nodes || []);
      } catch (error) {
        console.error("Failed to fetch latest posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <>
      <div className="mb-8 border border-gray-200 py-7 px-5 h-fit">
        <h2 className="text-[#002147] text-2xl font-medium mb-2">
          Tin Tức Mới Nhất
        </h2>
        <div className="border-b-4 border-yellow-400 w-12 mb-4"></div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-16 bg-gray-200  mb-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Link
                  key={index}
                  href={`/tin-tuc/${post.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-16 flex-shrink-0  overflow-hidden">
                      {post.featuredImage?.node?.mediaItemUrl ? (
                        <Image
                          src={post.featuredImage.node.mediaItemUrl}
                          alt={`Hình ảnh bài viết: ${post.title}`}
                          width={80}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            No image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#fdc800] transition-all duration-300">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Dữ liệu đang được chúng tôi cập nhật
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
