"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { formatDate } from "@/utils/date";
import { CountdownTimerProps } from "@/types/types";
import { TimeSeparator } from "@/app/components/atoms/TimeSeparator";
import { TimeUnit } from "@/app/components/atoms/TimeUnit";

export const CountdownTimer = ({
  title,
  date,
  includeTime = false,
}: CountdownTimerProps) => {
  const timeLeft = useCountdown(date, includeTime);

  return (
    <div className="flex flex-col items-center text-center max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h2 className="text-5xl md:text-6xl text-[#002147] font-bold">{title}</h2>
        <p className="text-lg font-medium text-[#002147] mt-2">
          {formatDate(date)}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <TimeUnit value={timeLeft.hours} label="Giờ" size="text-6xl md:text-8xl" />
        <TimeSeparator textSize="text-6xl md:text-8xl" />
        <TimeUnit value={timeLeft.minutes} label="Phút" size="text-6xl md:text-8xl" />
        <TimeSeparator textSize="text-6xl md:text-8xl" />
        <TimeUnit value={timeLeft.seconds} label="Giây" size="text-6xl md:text-8xl" />
      </div>
    </div>
  );
};
