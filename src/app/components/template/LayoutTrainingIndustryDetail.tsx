"use client";

import { clean } from "@/lib/sanitizeHtml";
import styles from "@/styles/Post.module.css";
import { IndustryGroup } from "@/types/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FormWrapper } from "../molecules/FormWrapper";
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
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  const industryGroups: IndustryGroup[] = nganhHocData?.industrygroups || [];

  return (
    <div className="bg-[#f5f5f5]">
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title={courseData?.title || "Đang cập nhật..."}
        breadcrumbs={[
          { label: "Trang Chủ", url: "/" },
          { label: "Ngành Đào Tạo", url: "/nganh-dao-tao" },
          { label: courseData?.nganh?.nameBranch || "Đang cập nhật..." }
        ]}
      />
      <div className="py-10">
        <LayoutBottom
          isSticky={false}
          showVideoMajorDetail={false}
          showAllMajor={false}
          showRegister={true}
          showForm={false}
        >
          <>
            <article className={styles["post"]}>
              <main>
                {courseData && (
                  <>
                    <div className={styles["post__main"] + " lg:px-0"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: clean(courseData?.nganh?.content)
                        }}
                      />
                    </div>
                  </>
                )}
              </main>
            </article>
          </>
          <FormWrapper type="form-main" />
        </LayoutBottom>
        <RelatedCourses data={industryGroups} />
      </div>
    </div>
  );
}
