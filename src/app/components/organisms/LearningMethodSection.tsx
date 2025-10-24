"use client";

import Image from "next/image";

export const LearningMethodSection = ({ data }: { data: any }) => {
  const learningMethods = data?.items || [
    {
      text: "Tự học thông qua bài giảng điện tử và hệ thống học liệu bổ trợ khác."
    },
    {
      text: "Học tập trực tuyến, chỉ cần máy tính hoặc thiết bị di động thông minh có kết nối Internet."
    },
    {
      text: "Tăng cường giao tiếp với giảng viên thông qua diễn đàn môn học."
    },
    {
      text: "Một học kỳ chỉ tập trung 2 ngày để thi kết thúc học phần (vào thứ 7 và CN)."
    },
    {
      text: "Làm bài kiểm tra tại nhà."
    }
  ];
  return (
    <div className="relative w-full h-[705.398px] overflow-hidden">
      <Image
        src="/bg-ss6.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative max-w-6xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2  ">
          <Image
            src={data?.image?.node?.mediaItemUrl || "/human-traval.png"}
            alt="Hình ảnh 2 người đi du lịch"
            width={900}
            height={900}
            className="lg:w-[600px] w-52 h-auto absolute lg:left-20 left-56 lg:pt-8 pt-[450px] z-10"
          />
        </div>
      </div>
      <div className="absolute lg:top-14 top-40 -right-10 lg:right-80 order-1 lg:order-2">
        <div className="relative scale-[1.5] lg:scale-100 origin-right">
          <Image
            src="/van-ban.png"
            alt="Hình ảnh tờ giấy"
            width={900}
            height={900}
            className="w-[400px] lg:w-[700px] lg:h-auto h-96 z-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center right-0">
            <Image
              src={
                data?.imageHocTap?.node?.mediaItemUrl ||
                "/hinh-thuc-hoc-tap.png"
              }
              alt="Hình thức học tập"
              width={200}
              height={200}
              className="w-auto h-16 lg:h-32 absolute top-10 lg:right-44 right-28"
            />
            <div className="space-y-1 lg:space-y-3 w-full lg:max-w-[420px] max-w-[300px] pl-20 pt-8">
              {learningMethods.map((method: any, index: number) => (
                <div
                  key={index}
                  className="relative flex items-start gap-1 lg:gap-4 group"
                  style={{
                    transform: `translateX(${-index * 8}px) translateY(${index * 2}px)`,
                    transformOrigin: "left top"
                  }}
                >
                  <div className="relative flex-shrink-0 mt-1">
                    <Image
                      src="/sticky.png"
                      alt="Dấu sticky"
                      width={50}
                      height={50}
                      className="w-6 h-6 lg:w-12 lg:h-12"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 lg:w-6 lg:h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[10px] lg:text-base text-gray-800 leading-tight lg:leading-relaxed font-bold flex-1">
                    {method.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
