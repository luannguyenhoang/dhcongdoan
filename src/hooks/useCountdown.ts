import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (
  targetDate: string,
  includeTime = false
): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      let targetDateObj;

      if (targetDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const [day, month, year] = targetDate.split("/").map(Number);
        targetDateObj = new Date(year, month - 1, day);
      } else {
        targetDateObj = new Date(targetDate);
      }

      if (!includeTime) {
        targetDateObj.setHours(0, 0, 0, 0);
      }

      const now = new Date();
      const difference = targetDateObj.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, includeTime]);

  return timeLeft;
};
