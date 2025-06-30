"use client";

import { TimeSeparator } from "@/app/components/atoms/TimeSeparator";
import { TimeUnit } from "@/app/components/atoms/TimeUnit";
import { useCountdown } from "@/hooks/useCountdown";
import { formatDate } from "@/utils/date";
import Image from "next/image";

export const OpeningScheduleBanner = ({ data }: { data?: any }) => {
  const timeLeft = useCountdown(data?.date || "2025-06-01");

  return (
    <div className="w-full py-28" style={{ backgroundColor: "#fdc800" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-3/4">
            <Image
              src={data?.banner?.node?.mediaItemUrl || "/image10.webp"}
              alt="Hình ảnh sinh viên trong khuôn viên trường"
              width={1200}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="w-full md:w-2/4 flex flex-col justify-center items-center text-center bg-[#002147] p-8">
            <h2 className="lg:text-4xl text-2xl font-medium text-white mb-4">
              {data?.title || "Lịch Khai Giảng"}
            </h2>
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center gap-0.5 md:gap-1 text-white">
                <TimeUnit
                  value={timeLeft.days}
                  label="Ngày"
                  inverted
                  size="text-3xl md:text-4xl lg:text-5xl"
                />
                <TimeSeparator light />
                <TimeUnit
                  value={timeLeft.hours}
                  label="Giờ"
                  inverted
                  size="text-3xl md:text-4xl lg:text-5xl"
                />
                <TimeSeparator light />
                <TimeUnit
                  value={timeLeft.minutes}
                  label="Phút"
                  inverted
                  size="text-3xl md:text-4xl lg:text-5xl"
                />
                <TimeSeparator light />
                <TimeUnit
                  value={timeLeft.seconds}
                  label="Giây"
                  inverted
                  size="text-3xl md:text-4xl lg:text-5xl"
                />
              </div>
            </div>
            <p className="text-white font-medium text-md mb-4">
              {data?.date ? formatDate(data.date) : "Đang cập nhật"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
