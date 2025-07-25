"use client";

import { IndustryGroup } from "@/types/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);
const PageBanner = dynamic(() =>
  import("@/app/components/molecules/PageBanner").then((mod) => mod.PageBanner)
);
const RelatedCourses = dynamic(() =>
  import("@/app/components/molecules/RelatedCourses").then(
    (mod) => mod.RelatedCourses
  )
);
const CourseContent = dynamic(() =>
  import("@/app/components/organisms/CourseContent").then(
    (mod) => mod.CourseContent
  )
);
const LayoutBottom = dynamic(() =>
  import("@/app/components/template/LayoutBottom").then(
    (mod) => mod.LayoutBottom
  )
);

export default function TrainingIndustryDetailLayout({
  courseData,
  nganhHocData
}: {
  courseData?: any;
  nganhHocData?: any;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Set timer to show popup after 12 seconds
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  const bannerUrl = nganhHocData?.banner?.node?.mediaItemUrl || "/image11.webp";
  const industryGroups: IndustryGroup[] = nganhHocData?.industrygroups || [];

  return (
    <div className="bg-[#f5f5f5]">
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title={courseData?.title || "Đang cập nhật..."}
        backgroundImage={bannerUrl}
        breadcrumbs={[
          { label: "Trang Chủ", url: "/" },
          { label: "Ngành Đào Tạo", url: "/nganh-dao-tao" },
          { label: courseData?.title || "Đang cập nhật..." }
        ]}
      />
      <div className="py-24">
        <LayoutBottom
          showVideoMajorDetail={false}
          showAllMajor={false}
          showRegister={true}
          showForm={false}
        >
          <>
            <CourseContent
              courseData={courseData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <RelatedCourses data={industryGroups} />
          </>
        </LayoutBottom>
      </div>
    </div>
  );
}
