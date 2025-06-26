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
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      let targetDateObj;

      try {
        // Handle DD/MM/YYYY format
        if (targetDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
          const [day, month, year] = targetDate.split("/").map(Number);
          targetDateObj = new Date(year, month - 1, day);
        } else {
          // Handle ISO format (YYYY-MM-DD)
          targetDateObj = new Date(targetDate);
        }

        // Check if date is valid
        if (isNaN(targetDateObj.getTime())) {
          console.error("Invalid date provided to countdown:", targetDate);
          targetDateObj = new Date();
          targetDateObj.setFullYear(targetDateObj.getFullYear() + 1);
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
        } else {
          // If the date has passed, show zeros
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } catch (error) {
        console.error("Error in countdown calculation:", error);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, includeTime]);

  return timeLeft;
};
