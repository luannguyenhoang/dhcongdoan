"use client";

import Link from "next/link";
import ChevronIcon from "@/icons/ChevronIcon";

interface PageBannerProps {
  title: string;
  breadcrumbs?: Array<{ label: string; url?: string }>;
  backgroundImage?: string;
}

export const PageBanner = ({
  title,
  breadcrumbs,
  backgroundImage = "/images/page-banner-default.jpg"
}: PageBannerProps) => {
  return (
    <div
      className="relative w-full h-[250px]  text-white z-0"
      style={{
        backgroundImage: ` url('${backgroundImage}')`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-start justify-center mt-auto h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0"></div>

        <div className="text-start z-10 lg:px-0 px-4">
          <h1 className="text-4xl  mx-auto md:text-5xl font-bold mb-4 z-10">
            {title}
          </h1>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex items-start justify-start text-sm">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronIcon />}
                  {item.url ? (
                    <Link
                      href={item.url}
                      className="text-white hover:text-yellow-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={index === 0 ? "text-white" : "text-yellow-400"}
                    >
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
