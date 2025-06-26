interface CourseDetailItemProps {
  content: string;
}

export const CourseDetailItem = ({ content }: CourseDetailItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 text-yellow-500 border-2 border-yellow-500 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3 h-3"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <span>{content}</span>
    </div>
  );
};
