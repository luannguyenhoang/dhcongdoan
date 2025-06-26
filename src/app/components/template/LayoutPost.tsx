"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const SliderBar = dynamic(() =>
  import("@/app/components/organisms/SliderBar").then((mod) => mod.SliderBar)
);

export const LayoutPost = ({
  children,
  m,
  showAllMajor = false,
  showForm = false
}: {
  children: ReactNode;
  m?: string;
  showAllMajor?: boolean;
  showForm?: boolean;
}) => {
  return (
    <div className="mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-9  lg:px-0">{children}</div>
        <div className={`sidebar-posts lg:col-span-3 ${m}`}>
          <SliderBar
            showNewPost={true}
            showCustomSearch={false}
            showVideoMajorDetail={false}
            showAllMajor={showAllMajor}
            showRegister={false}
            showForm={showForm}
          />
        </div>
      </div>
    </div>
  );
};
