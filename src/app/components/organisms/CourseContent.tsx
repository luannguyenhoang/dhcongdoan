import { CourseTabs } from "@/app/components/organisms/CourseTabs";
import { CourseContentProps } from "@/types/types";
import Image from "next/image";

export const CourseContent = ({
  courseData,
  activeTab,
  setActiveTab
}: CourseContentProps) => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <div className="mb-6 relative h-[400px] w-full overflow-hidden">
        <Image
          placeholder="blur"
          blurDataURL="/no-image.jpeg"
          src={courseData?.image?.node?.mediaItemUrl || "/no-image.jpeg"}
          alt="Hình ảnh minh họa khóa học"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      <CourseTabs
        courseData={courseData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
