import { FaBook, FaGraduationCap, FaUser } from "react-icons/fa";

interface FeatureBoxItem {
  title: string;
  description: string;
}

export default function FeatureBoxes({ data }: { data?: FeatureBoxItem[] }) {
  const featureBoxesData = data || [
    {
      title: "Học Online 100% Thuận Tiện",
      description:
        "Áp dụng hình thức học trực tuyến hoàn toàn, bạn có thể học mọi lúc, mọi nơi mà không cần đến lớp, giúp tiết kiệm thời gian và linh hoạt trong việc sắp xếp lịch học."
    },
    {
      title: "Văn Bằng Đại Học Chuẩn",
      description:
        "Chương trình đào tạo từ xa của chúng tôi cấp bằng đại học chính quy, được Bộ Giáo dục và Đào tạo công nhận, mang lại giá trị cao cho sự nghiệp của bạn"
    },
    {
      title: "Chỉ Xét Tuyển, Không Thi Tuyển",
      description:
        "Với phương thức xét tuyển đơn giản, bạn không phải lo lắng về kỳ thi, chỉ cần đáp ứng yêu cầu đầu vào để dễ dàng nhập học và bắt đầu hành trình học tập"
    }
  ];

  const icons = [
    <FaGraduationCap key="graduation" />,
    <FaUser key="user" />,
    <FaBook key="book" />
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
