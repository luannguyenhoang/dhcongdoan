"use client";

import Image from "next/image";
import Link from "next/link";
import xss from "xss";

export const CourseCard = ({
  title,
  desc,
  image,
  path
}: {
  title: string;
  desc: string;
  image?: string;
  path?: string;
}) => {
  return (
    <div className="relative flex flex-col overflow-hidden border border-gray-100 shadow-md bg-white transition-all duration-300 group h-full">
      <div className="w-full relative overflow-hidden">
        <Link href={path ?? "#"}>
          <Image
            placeholder="blur"
            blurDataURL={image || `/no-image.jpeg`}
            loading="lazy"
            width={720}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            height={300}
            src={image || `/no-image.jpeg`}
            alt={`Ảnh khóa học ${title}`}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "16/10",
              objectFit: "cover"
            }}
          />

          <div className="absolute inset-0 bg-[#002147]/60 flex items-center justify-center translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500">
            <div className="w-11 h-11 rounded-full  border border-[#fdc800] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
          </div>
        </Link>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-xl text-[#002147] font-medium">
          <Link
            href={path ?? "#"}
            className="hover:text-[#fdc800] transition-colors duration-300"
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
