"use client";

import Image from "next/image";
import Link from "next/link";
import xss from "xss";

export const CardBlogVert = ({
  title,
  desc,
  image,
  path,
  date
}: {
  title: string;
  desc: string;
  image?: string;
  path?: string;
  date?: string;
}) => {
  const dateObj = date ? new Date(date) : new Date();
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();

  return (
    <div className="relative flex flex-col overflow-hidden  bg-white transition-all duration-300 group mb-8">
      <div className="w-full relative">
        <Link href={path ?? "#"}>
          <Image
            placeholder="blur"
            blurDataURL={image || `/no-image.jpeg`}
            loading="lazy"
            width={720}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            height={200}
            src={image || `/no-image.jpeg`}
            alt={`Hình ảnh cho ${title}`}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/9",
              objectFit: "cover"
            }}
          />
        </Link>

        <div className="absolute left-0 bottom-0 flex flex-col text-center">
          <div className="bg-blue-800 text-white font-bold py-1 px-3">
            {day} {month}
          </div>
          <div className="bg-yellow-500 text-black font-bold py-1 px-3">
            {year}
          </div>
        </div>
      </div>

      <div className="pt-4 pb-4 flex flex-col gap-3">
        <h3 className="text-xl text-black font-bold">
          <Link
            href={path ?? "#"}
            className="hover:text-[#e8b800] transition-colors duration-300"
            dangerouslySetInnerHTML={{ __html: xss(title) }}
          />
        </h3>

        <div className="flex items-center gap-4 text-sm">
          <div className="text-gray-500 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="font-medium">By</span> {"Admin"}
          </div>
        </div>
        <div
          className="text-gray-600 text-sm line-clamp-3 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </div>
    </div>
  );
};
