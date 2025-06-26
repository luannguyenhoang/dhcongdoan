export const TimeUnit = ({
  value,
  label,
  inverted = false,
  size = "text-7xl"
}: {
  value: number;
  label: string;
  inverted?: boolean;
  size?: string;
}) => {
  return (
    <>
      <div className="text-center">
        <div
          className={`${size} font-bold ${inverted ? "text-white" : "text-[#002147]"}`}
        >
          {String(value).padStart(2, "0")}
        </div>
        <div
          className={`text-sm ${inverted ? "text-white" : "text-[#002147]"}`}
        >
          {label}
        </div>
      </div>
    </>
  );
};
