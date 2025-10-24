"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);

interface RegistrationBannerProps {
  data?: any;
}

export const RegistrationBanner = ({ data }: RegistrationBannerProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const bannerText =
    data?.registrationBanner || "Không thi đầu vào - 100% học online";

  const handleRegisterClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <div className="w-full bg-[#f8c10a] py-2 lg:py-2">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 lg:gap-4">
          <h2 className="text-lg lg:text-xl font-bold text-[#201f81] text-center lg:text-left">
            {bannerText}
          </h2>

          <button
            onClick={handleRegisterClick}
            className="bg-white text-[#201f81] font-bold px-6 lg:px-8 py-2.5 lg:py-2 rounded-full hover:bg-gray-100 transition-colors duration-900 shadow-md hover:shadow-lg text-sm lg:text-lg whitespace-nowrap animate-pulse-scale"
          >
            ĐĂNG KÝ NGAY
          </button>
        </div>
      </div>
    </>
  );
};
