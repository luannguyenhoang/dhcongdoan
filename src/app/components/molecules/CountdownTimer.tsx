"use client";

import { TimeSeparator } from "@/app/components/atoms/TimeSeparator";
import { TimeUnit } from "@/app/components/atoms/TimeUnit";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownTimerProps } from "@/types/types";
import { formatDate } from "@/utils/date";

export const CountdownTimer = ({
  title,
  date,
  includeTime = false
}: CountdownTimerProps) => {
  const timeLeft = useCountdown(date || "", includeTime);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center text-center max-w-6xl mx-auto py-12 lg:py-24 px-4 gap-6">
      <div className="w-full lg:w-auto">
        <h2 className="text-5xl md:text-6xl text-[#002147] font-medium">
          {title || "Lịch Khai Giảng"}
        </h2>
        <p className="text-lg font-medium text-[#002147] mt-2">
          {formatDate(date || "")}
        </p>
      </div>

      <div className="flex items-center justify-center w-full lg:w-auto">
        <TimeUnit
          value={timeLeft.days}
          label="Ngày"
          size="text-5xl md:text-6xl lg:text-8xl"
        />
        <TimeSeparator textSize="text-5xl md:text-6xl lg:text-8xl" />
        <TimeUnit
          value={timeLeft.hours}
          label="Giờ"
          size="text-5xl md:text-6xl lg:text-8xl"
        />
        <TimeSeparator textSize="text-5xl md:text-6xl lg:text-8xl" />
        <TimeUnit
          value={timeLeft.minutes}
          label="Phút"
          size="text-5xl md:text-6xl lg:text-8xl"
        />
        <TimeSeparator textSize="text-5xl md:text-6xl lg:text-8xl" />
        <TimeUnit
          value={timeLeft.seconds}
          label="Giây"
          size="text-5xl md:text-6xl lg:text-8xl"
        />
      </div>
    </div>
  );
};
