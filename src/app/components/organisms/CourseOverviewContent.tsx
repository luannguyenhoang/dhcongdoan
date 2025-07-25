import { CourseDetails } from "@/app/components/organisms/CourseDetails";
import { CourseOverviewContentProps } from "@/types/types";

export const CourseOverviewContent = ({ data }: CourseOverviewContentProps) => {
  if (!data) return null;

  return (
    <>
      <CourseDetails details={data.courseDetails || []} />
      <div className="prose max-w-none">
        {data.courseContent &&
          data.courseContent
            .split("\r\n\r\n")
            .map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
      </div>
    </>
  );
};
