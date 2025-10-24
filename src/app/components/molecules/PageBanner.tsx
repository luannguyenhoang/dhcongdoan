"use client";

import ChevronIcon from "@/icons/ChevronIcon";
import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumbs?: Array<{ label: string; url?: string }>;
}

export const PageBanner = ({ title, breadcrumbs }: PageBannerProps) => {
  return (
    <div className="relative w-full h-[210px]  text-white z-0 bg-[#e5992e] p-3">
      <div className=" flex flex-col items-start justify-center mt-auto h-full border-2 border-dashed border-white rounded-[10px]  p-4">
        <div className="text-start z-10 lg:px-0 px-4 w-full px-auto">
          <h1
            className="text-3xl text-center mx-auto md:text-4xl font-bold mb-4 z-10 text-white"
            style={{ textShadow: "3px 3px 0px #000000" }}
          >
            {title}
          </h1>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex items-start justify-center text-sm">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center font-bold">
                  {index > 0 && <ChevronIcon />}
                  {item.url ? (
                    <Link
                      href={item.url}
                      className="text-white hover:text-yellow-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white hover:text-yellow-200">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
