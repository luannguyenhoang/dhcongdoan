import { FaBook, FaGraduationCap, FaUser } from "react-icons/fa";

interface FeatureBoxItem {
  title: string;
  description: string;
}

export default function FeatureBoxes({ data }: { data?: FeatureBoxItem[] }) {
  const featureBoxesData = data || [
    {
      title: "Cơ sở đào tạo",
      description: "Văn bản giả mạo in ấn của ngành công nghiệp.",
    },
    {
      title: "Giảng viên có kỹ năng",
      description: "Văn bản giả mạo in ấn của ngành công nghiệp.",
    },
    {
      title: "Thư viện & Cửa hàng sách",
      description: "Văn bản giả mạo in ấn của ngành công nghiệp.",
    },
  ];

  const icons = [
    <FaGraduationCap key="graduation" />,
    <FaUser key="user" />,
    <FaBook key="book" />,
  ];

  return (
    <div className="lg:absolute static bottom-0 left-0 right-0 bg-transparent max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row">
        {featureBoxesData.map((item: FeatureBoxItem, index: number) => (
          <div
            key={index}
            className={`flex-1 lg:bg-[#234471]/60 bg-[#234471] p-6 flex items-center justify-between ${
              index === 1
                ? "border-y md:border-y-0 md:border-x border-blue-800/50"
                : ""
            }`}
          >
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
            <div className="text-yellow-400 text-3xl ml-4">{icons[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
