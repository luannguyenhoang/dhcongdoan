"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FormWrapper } from "@/app/components/molecules/FormWrapper";

export const Register = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  return (
    <div>
      <div className="mb-8 border border-gray-200 py-7 px-5">
        <h2 className="text-[#002147] text-2xl font-medium mb-2">
          Tư Vấn Ngành
        </h2>
        <div className="border-b-4 border-yellow-400 w-12 mb-4"></div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowPopup(true)}
            className="w-full py-3 px-4 bg-[#002147] text-white font-semibold uppercase"
          >
            ĐĂNG KÍ
          </button>
        </div>
      </div>

      {mounted &&
        showPopup &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]"
            style={{ isolation: "isolate" }}
          >
            <div
              className="bg-white p-5 rounded-lg w-[400px] max-w-[90vw] relative"
              style={{ zIndex: 100000 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2.5 right-2.5 bg-transparent border-none text-xl cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h3 className="text-center mb-5">Để lại thông tin</h3>
              <FormWrapper />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
