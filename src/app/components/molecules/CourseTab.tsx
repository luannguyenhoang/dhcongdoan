interface CourseTabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const CourseTab = ({ id, label, isActive, onClick }: CourseTabProps) => {
  return (
    <button
      className={`py-3 px-8 border-r font-medium ${
        isActive ? "bg-[#002147] text-white" : "bg-gray-100"
      }`}
      onClick={() => onClick(id)}
      aria-label={`${label} tab`}
      aria-selected={isActive}
      role="tab"
    >
      {label}
    </button>
  );
};
