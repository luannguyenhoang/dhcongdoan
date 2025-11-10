"use client";

import { GET_POPUP } from "@/app/api/graphQL/getPopup";
import { getData } from "@/lib/getData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "popupEventClosed";
const RESET_TIME = 10 * 60 * 1000; // 10 phút (600000ms)

export const PopupEvent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    // Fetch popup data
    const fetchPopupData = async () => {
      try {
        const data = await getData(GET_POPUP);
        if (data?.pageBy?.popup) {
          setPopupData(data.pageBy.popup);
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    // Kiểm tra localStorage trước khi quyết định hiển thị popup
    if (typeof window !== "undefined") {
      const closedTime = localStorage.getItem(STORAGE_KEY);

      if (!closedTime) {
        // Chưa đóng bao giờ, hiển thị popup
        setShowPopup(true);
      } else {
        // Kiểm tra xem đã qua 10 phút chưa
        const closedTimestamp = parseInt(closedTime, 10);

        if (isNaN(closedTimestamp)) {
          // Nếu không parse được, xóa và hiển thị popup
          localStorage.removeItem(STORAGE_KEY);
          setShowPopup(true);
        } else {
          const timeDiff = Date.now() - closedTimestamp;

          if (timeDiff >= RESET_TIME) {
            // Đã qua 10 phút, xóa localStorage và hiển thị popup lại
            localStorage.removeItem(STORAGE_KEY);
            setShowPopup(true);
          }
          // Nếu chưa qua 10 phút thì không hiển thị popup (showPopup vẫn là false)
        }
      }
    }

    fetchPopupData();
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    if (typeof window !== "undefined") {
      // Lưu timestamp hiện tại vào localStorage
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  };

  if (!mounted || !showPopup || typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999] overflow-hidden"
      style={{
        isolation: "isolate",
        paddingRight: "calc(100vw - 100%)"
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-auto lg:max-w-[70vw] lg:max-h-[80vh] max-w-[90vw] max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-1 border-none cursor-pointer z-10 shadow-lg"
          onClick={handleClose}
          aria-label="Đóng popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {/* Desktop Image */}
        <Image
          src={popupData?.imageDesktop?.node?.mediaItemUrl || "/ImageEvent.jpg"}
          alt="Sự kiện đặc biệt"
          width={900}
          height={450}
          className="hidden md:block w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg"
          priority
        />
        {/* Mobile Image */}
        <Image
          src={popupData?.imageMobile?.node?.mediaItemUrl || "/ImageEvent.jpg"}
          alt="Sự kiện đặc biệt"
          width={400}
          height={400}
          className="md:hidden w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg"
          priority
        />
      </div>
    </div>,
    document.body
  );
};
