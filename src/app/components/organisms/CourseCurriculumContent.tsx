import { CourseDetails } from "@/app/components/organisms/CourseDetails";
import { CourseCurriculumContentProps } from "@/types/types";

export const CourseCurriculumContent = ({
  data
}: CourseCurriculumContentProps) => {
  if (!data) return null;

  return (
    <>
      <CourseDetails details={data.courseDetails || []} />

      <div className="prose max-w-none">
        {data.coursecontent && (
          <div
            className="content-lowercase"
            dangerouslySetInnerHTML={{
              __html: data.coursecontent.toLowerCase()
            }}
          />
        )}
      </div>
    </>
  );
};
