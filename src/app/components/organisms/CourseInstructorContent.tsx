import { CourseDetails } from "@/app/components/organisms/CourseDetails";
import { CourseInstructorContentProps } from "@/types/types";
import Image from "next/image";

export const CourseInstructorContent = ({
  data
}: CourseInstructorContentProps) => {
  if (!data) return null;

  return (
    <>
      <CourseDetails details={data.courseDetails || []} />

      <div className="prose max-w-none">
        <div className="flex gap-4 items-start mb-6">
          <div className="w-24 h-24 relative rounded-full overflow-hidden shrink-0 border border-yellow-400">
            <Image
              src={data.teacher?.avarta?.node?.mediaItemUrl || "/image4.png"}
              alt={`Ảnh giảng viên: ${data.teacher?.name || "Instructor"}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col gap-2 my-auto">
            <h2 className="text-xl font-bold ">
              {data.teacher?.name || "Instructor"}
            </h2>
            <p className="text-gray-600">{data.teacher?.role || "Educator"}</p>
          </div>
        </div>

        {data.courseContent &&
          data.courseContent
            .split(/\r\n\r\n|\r\n/)
            .filter((paragraph: string) => paragraph.trim() !== "")
            .map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
      </div>
    </>
  );
};
