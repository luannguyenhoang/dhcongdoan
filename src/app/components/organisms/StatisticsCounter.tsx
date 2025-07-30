"use client";

import { StatItem } from "@/app/components/atoms/StatItem";
import { useEffect, useRef, useState } from "react";

const DEFAULT_STATS = [
  { number: "78", text: "Năm xây dựng và phát triển" },
  { number: "17", text: "Ngành đào tạo tại trường" },
  { number: "6", text: "Ngành đào tạo trực tuyến" },
  { number: "2500", text: "Sinh viên các hệ đăng ký nhập học mỗi năm" }
];

export const StatisticsCounter = ({
  duration = 2000,
  data = DEFAULT_STATS
}: {
  duration?: any;
  data?: { number: string; text: string }[];
}) => {
  const [counts, setCounts] = useState<number[]>(data.map(() => 0));
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const intervals: NodeJS.Timeout[] = [];

    data.forEach((stat, index) => {
      const value = parseInt(stat.number, 10);
      const step = Math.ceil(value / (duration / 50));
      let currentCount = 0;

      const interval = setInterval(() => {
        currentCount = Math.min(currentCount + step, value);
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = currentCount;
          return newCounts;
        });

        if (currentCount >= value) {
          clearInterval(interval);
        }
      }, 50);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [isInView, duration, data]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 h-60 z relative"
      style={{
        backgroundImage: "url('/image11.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {data?.map((stat, index) => (
            <StatItem key={index} count={counts[index]} title={stat?.text} />
          ))}
        </div>
      </div>
    </section>
  );
};
