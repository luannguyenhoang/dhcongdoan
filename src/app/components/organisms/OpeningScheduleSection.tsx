"use client";

import { useCountdown } from "@/hooks/useCountdown";
import Image from "next/image";
import { FormWrapper } from "../molecules/FormWrapper";

const ScheduleCard = ({
  city,
  date,
  top,
  left
}: {
  city: string;
  date: string;
  top?: string;
  left?: string;
}) => {
  const timeLeft = useCountdown(date, true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  return (
    <div
      className={`absolute ${top || "top-8"} ${left || "left-8"} hidden lg:block`}
    >
      <div className="relative">
        <Image
          src={city === "HÀ NỘI" ? "/days-hn.png" : "/days-hcm.png"}
          alt={`Lịch khai giảng ${city}`}
          width={280}
          height={300}
          className="w-[380px] h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center pt-12">
          <div className=" text-white px-8  rounded-sm mb-2">
            <h3 className="font-bold text-base text-center">TẠI {city}</h3>
          </div>
          <div className="text-[#1a3a6b] text-sm font-semibold mb-3">
            {formatDate(date)}
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center">
              <div className="bg-[#2a4a7c] text-white font-bold text-3xl px-3 py-2 rounded min-w-[50px] text-center">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <span className="text-xs text-gray-600 mt-1">Ngày</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#2a4a7c] text-white font-bold text-3xl px-3 py-2 rounded min-w-[50px] text-center">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-xs text-gray-600 mt-1">Giờ</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#2a4a7c] text-white font-bold text-3xl px-3 py-2 rounded min-w-[50px] text-center">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-xs text-gray-600 mt-1">Phút</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#2a4a7c] text-white font-bold text-3xl px-3 py-2 rounded min-w-[50px] text-center">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <span className="text-xs text-gray-600 mt-1">Giây</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegistrationForm = () => {
  return (
    <div className="w-full lg:absolute lg:top-12 lg:right-8 lg:max-w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#0a3d7a] to-[#1557a8] text-white text-center py-4 px-4">
        <h3 className="font-bold text-xl mb-2">ĐĂNG KÝ NGAY</h3>
        <p className="text-sm">Trước khi thời gian kết thúc hoặc</p>
        <p className="text-sm">Số lượng học viên đạt giới hạn</p>
      </div>
      <div className="p-6">
        <div className="max-h-[380px] overflow-auto">
          <FormWrapper type="form-main" />
        </div>
      </div>
    </div>
  );
};

export const OpeningScheduleSection = ({ data }: { data: any }) => {
  const scheduleData = data?.openingScheduleSection;
  const openingSchedules = scheduleData?.openingSchedule || [
    {
      location: "TẠI HÀ NỘI",
      date: "2025-10-18T00:00:00+00:00"
    },
    {
      location: "TẠI TP. HỒ CHÍ MINH",
      date: "2025-10-24T00:00:00+00:00"
    }
  ];

  return (
    <div className="relative w-full min-h-[700px] lg:h-[690px] overflow-hidden">
      <Image
        src="/bg-ss7.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      <div className="relative max-w-7xl mx-auto h-full">
        {openingSchedules.map((schedule: any, index: number) => (
          <ScheduleCard
            key={index}
            city={schedule.location}
            date={schedule.date}
            top={index === 0 ? "top-24" : "top-[21rem]"}
            left="left-8"
          />
        ))}

        <div className="absolute left-1/2 top-72 -translate-x-1/2 -translate-y-1/2 hidden lg:block pl-10">
          <Image
            src={
              scheduleData?.studentImage?.node?.mediaItemUrl || "/student.png"
            }
            alt="Hình ảnh học sinh"
            width={500}
            height={500}
            className="w-[420px] h-auto scale-x-[-1]"
          />
        </div>

        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden lg:block pl-10">
          <Image
            src={
              scheduleData?.imageText?.node?.mediaItemUrl ||
              "/lichKhaiGiang.png"
            }
            alt="Chữ lịch khai giảng"
            width={400}
            height={150}
            className="w-[400px] h-auto"
          />
        </div>

        <div className="px-4 lg:px-0 py-8 lg:py-0">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};
