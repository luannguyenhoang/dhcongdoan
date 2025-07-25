"use client";

import { PostColumn } from "@/app/components/molecules/PostColumn";
import { PostProps } from "@/types/types";
import { useEffect, useState } from "react";

export const LatestPostsSection = () => {
  const [tinTucPosts, setTinTucPosts] = useState<PostProps[]>([]);
  const [tuyenSinhPosts, setTuyenSinhPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        if (!navigator.onLine) {
          throw new Error("No internet connection");
        }

        const tuyenSinhRes = await fetch(
          `/api/posts?categoryId=dGVybToyODU=&size=3&offset=0`
        );
        if (!tuyenSinhRes.ok) {
          throw new Error(
            `Failed to fetch tuyen sinh posts: ${tuyenSinhRes.status}`
          );
        }
        const tuyenSinhData = await tuyenSinhRes.json();

        const tinTucRes = await fetch(
          `/api/posts?categoryId=dGVybTox&size=3&offset=0`
        );
        if (!tinTucRes.ok) {
          throw new Error(`Failed to fetch tin tuc posts: ${tinTucRes.status}`);
        }
        const tinTucData = await tinTucRes.json();

        if (!tinTucData || !tuyenSinhData) {
          throw new Error("Invalid data received from API");
        }

        const transformPosts = (
          posts: any[],
          category: string
        ): PostProps[] => {
          if (!Array.isArray(posts)) {
            throw new Error(
              `Expected posts to be an array, got ${typeof posts}`
            );
          }
          return posts.map((post) => ({
            title: post.title,
            date: post.date,
            image: post.featured_image || "/default.jpg",
            excerpt: post.excerpt,
            slug:
              category === "tin-tuc"
                ? `/tin-tuc/${post.slug}`
                : `/thong-tin-tuyen-sinh/${post.slug}`
          }));
        };

        setTinTucPosts(transformPosts(tinTucData.posts || [], "tin-tuc"));
        setTuyenSinhPosts(
          transformPosts(tuyenSinhData.posts || [], "tuyen-sinh")
        );
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <PostColumn
            title="Tin tức"
            posts={tinTucPosts}
            link="/tin-tuc"
            isLoading={isLoading}
          />
          <PostColumn
            title="Thông tin tuyển sinh"
            posts={tuyenSinhPosts}
            link="/thong-tin-tuyen-sinh"
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};
