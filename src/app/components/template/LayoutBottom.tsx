"use client";

import DefaultLayout from "@/app/components/template/LayoutDefault";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const SliderBar = dynamic(() =>
  import("@/app/components/organisms/SliderBar").then((mod) => mod.SliderBar)
);

export const LayoutBottom = ({
  children,
  m,
  showCustomSearch = false,
  showVideoMajorDetail = false,
  showAllMajor = false,
  showRegister = false,
  showForm = false,
  showNewPost = false,
  onSearch,
  showSearchBar = false,
  isSticky = true
}: {
  children: ReactNode;
  m?: string;
  showCustomSearch?: boolean;
  showVideoMajorDetail?: boolean;
  onSearch?: (term: string) => void;
  showAllMajor?: boolean;
  showRegister?: boolean;
  showForm?: boolean;
  showNewPost?: boolean;
  showSearchBar?: boolean;
  isSticky?: boolean;
}) => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 lg:px-0">{children}</div>
        <div className={`sidebar-posts lg:col-span-4 ${m}`}>
          <SliderBar
            isSticky={isSticky}
            showSearchBar={showSearchBar}
            showCustomSearch={showCustomSearch}
            showVideoMajorDetail={showVideoMajorDetail}
            onSearch={onSearch}
            showAllMajor={showAllMajor}
            showRegister={showRegister}
            showForm={showForm}
            showNewPost={showNewPost}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};
