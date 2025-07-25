import { CourseTabNavigation } from "@/app/components/molecules/CourseTabNavigation";
import { CourseCurriculumContent } from "@/app/components/organisms/CourseCurriculumContent";
import { CourseInstructorContent } from "@/app/components/organisms/CourseInstructorContent";
import { CourseOverviewContent } from "@/app/components/organisms/CourseOverviewContent";
import { CourseTabsProps } from "@/types/types";

export const CourseTabs = ({
  courseData,
  activeTab,
  setActiveTab
}: CourseTabsProps) => {
  const tabs = [
    { id: "overview", label: courseData?.overview?.title || "Overview" },
    { id: "curriculum", label: courseData?.curriculum?.title || "Curriculum" },
    { id: "instructor", label: courseData?.instructor?.title || "Instructor" }
  ];

  return (
    <>
      <CourseTabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "overview" && (
        <CourseOverviewContent data={courseData?.overview || {}} />
      )}

      {activeTab === "curriculum" && (
        <CourseCurriculumContent data={courseData?.curriculum || {}} />
      )}

      {activeTab === "instructor" && (
        <CourseInstructorContent data={courseData?.instructor || {}} />
      )}
    </>
  );
};
