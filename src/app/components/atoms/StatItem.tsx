"use client";

import { StatItemProps } from "@/types/types";

export const StatItem = ({ count, title }: StatItemProps) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 mb-10 md:mb-0 px-8 flex justify-start">
      <div>
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="text-5xl font-medium text-white">{count || 0}</div>
            <div className="w-full h-[2px] bg-yellow-400 mt-4"></div>
          </div>
          <div className="text-white pl-4">
            <div className="uppercase text-sm leading-tight">
              <div>{title || "0"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
