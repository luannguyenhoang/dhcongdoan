"use client";

import { ReactNode } from "react";
import { SliderBar } from "@/app/components/organisms/SliderBar";
import DefaultLayout from "@/app/components/template/LayoutDefault";

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
  showSearchBar = false
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
}) => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 lg:px-0">{children}</div>
        <div className={`sidebar-posts lg:col-span-3 ${m}`}>
          <SliderBar
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
