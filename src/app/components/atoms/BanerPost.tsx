"use client";

import { formatDate } from "@/utils/date";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

export const BanerPost = ({ post }: { post: any }) => {
  if (!post) {
    return null;
  }

  const title = post?.title || "";
  const imageAlt = title ? `Featured image for: ${title}` : "";

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[300px] lg:h-[400px]">
        <Image
          src={post?.featuredImage || "/no-image.jpeg"}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          aria-hidden={!title}
        />
      </div>

      <div className=" bottom-0 left-0 right-0 flex justify-center w-full py-5">
        <div className="max-w-6xl w-full flex flex-col gap-4">
          <div className="text-xl font-medium text-[#002147] flex gap-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#fdc800]" />
              <span>{formatDate(post?.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
