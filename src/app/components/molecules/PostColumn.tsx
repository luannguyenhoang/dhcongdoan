import { PostProps } from "@/types/types";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import xss from "xss";

// Skeleton component for loading state
const PostSkeleton = () => (
  <div>
    <div className="flex gap-5 py-5 animate-pulse">
      <div className="w-36 h-28 bg-gray-200 flex-shrink-0"></div>
      <div className="flex-grow">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
    <div className="border-b border-gray-200"></div>
  </div>
);

export const PostColumn = ({
  title,
  posts,
  link,
  isLoading = false
}: {
  title: string;
  posts: PostProps[];
  link: string;
  isLoading?: boolean;
}) => (
  <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
    <h2 className="text-3xl font-medium text-[#002147] mb-8">{title}</h2>
    <div className="bg-white p-5">
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            <div className="flex gap-5 py-5">
              <div className="w-36 h-28 relative flex-shrink-0">
                <Image
                  src={post.image}
                  alt={`Hình ảnh bài viết: ${post.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <Link
                  href={post.slug}
                  className="block text-lg font-medium text-[#002147] hover:text-yellow-500 transition-colors mb-2"
                >
                  {post.title}
                </Link>
                <p className="text-yellow-500 font-medium text-sm mb-2">
                  {formatDate(post.date)}
                </p>
                <div
                  className="text-gray-600 text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: xss(post.excerpt) }}
                />
              </div>
            </div>
            {index < posts.length - 1 && (
              <div className="border-b border-gray-200"></div>
            )}
          </div>
        ))
      ) : (
        <div className="py-8 text-center text-gray-500">
          Dữ liệu đang được chúng tôi cập nhật
        </div>
      )}
    </div>
    <div className="mt-10 flex justify-start">
      <Link
        href={link || "/"}
        className="inline-block hover:text-[#002147] hover:bg-[#fdc800] bg-[#002147]  text-white py-3 px-6 text-sm font-medium uppercase transition-colors"
      >
        XEM TẤT CẢ
      </Link>
    </div>
  </div>
);
