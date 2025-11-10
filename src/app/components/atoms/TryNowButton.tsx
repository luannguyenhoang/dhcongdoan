"use client";

import Link from "next/link";
import React from "react";

export const TryNowButton = () => {
  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0% {
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(255, 140, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          100% {
            transform: scale(1.05);
            box-shadow: 0 12px 35px rgba(255, 140, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Link href="https://dhcongdoan.vn/lien-he">
          <button
            className="relative cursor-pointer font-extrabold transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
            style={{
              background:
                "linear-gradient(180deg, #fecd4b 0%, #FFA500 50%, #f9a414 100%)",
              borderRadius: "50px",
              padding: "10px 0px",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              minWidth: "200px",
              color: "#2D1B0E",
              border: "2px solid #E67E22",
              boxShadow:
                "0 8px 25px rgba(255, 140, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              textShadow: "none",
              animation: "pulse-glow 2s ease-in-out infinite alternate"
            }}
          >
            ĐĂNG KÝ NGAY
          </button>
        </Link>
      </div>
    </>
  );
};
