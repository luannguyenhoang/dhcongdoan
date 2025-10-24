"use client";

import { GET_CTA } from "@/app/api/graphQL/getCTA";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

interface CTAData {
  text?: string;
  link?: string;
}

export const PhoneCTA = () => {
  const [ctaData, setCtaData] = useState<CTAData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(GET_CTA);
        if (data?.pageBy?.trangChu?.cta) {
          setCtaData(data.pageBy.trangChu.cta);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching CTA data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    const phoneLink = ctaData.link || "tel:0907970678";
    window.open(phoneLink, "_self");
  };

  return (
    <div className="fixed bottom-14 left-5 z-50 ">
      <button
        onClick={handleClick}
        className="group relative flex items-center sm:bg-gradient-to-r sm:from-orange-400 sm:to-orange-500 sm:hover:from-orange-500 sm:hover:to-orange-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {/* Phone Icon */}
        <div className="relative mr-3 w-[50px] h-[40px] flex items-center justify-center">
          {/* Sóng tỏa */}
          <span className="absolute rounded-full bg-red-400 opacity-40 animate-ripple"></span>
          <span className="absolute rounded-full bg-red-400 opacity-30 animate-ripple delay-150"></span>
          <span className="absolute rounded-full bg-red-400 opacity-20 animate-ripple delay-300"></span>
          <div className="relative w-12 h-12 flex items-center justify-center bg-red-500 rounded-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Phone Number */}
        <span className="text-white font-bold text-lg pr-4 hidden sm:inline">
          {ctaData.text || "0907.970.678"}
        </span>
      </button>

      {/* CSS hiệu ứng */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .animate-ripple {
          width: 50px;
          height: 50px;
          animation: ripple 1.5s infinite;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};
