import { CourseDetailItem } from "@/app/components/atoms/CourseDetailItem";
import { CourseDetailsProps } from "@/types/types";

export const CourseDetails = ({ details }: CourseDetailsProps) => {
  if (!details || details.length === 0) return null;

  return (
    <div className="mb-6 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {details.map((detail, index) => (
          <CourseDetailItem
            key={index}
            content={detail.content || detail.tex || ""}
          />
        ))}
      </div>
    </div>
  );
};
