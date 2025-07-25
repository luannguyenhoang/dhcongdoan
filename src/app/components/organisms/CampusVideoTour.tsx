"use client";

import { VideoModal } from "@/app/components/molecules/VideoModal";
import { DEFAULT_VIDEO_TOUR } from "@/data/DefaultData";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

export const CampusVideoTour = ({ data }: { data?: any }) => {
  const videoData = data || DEFAULT_VIDEO_TOUR;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: "url('/image9.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />

        <div className="relative z-20 text-center text-white max-w-3xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {videoData?.title}
          </h2>
          <p className="mb-8 text-white/80 max-w-2xl mx-auto">
            {videoData?.description}
          </p>

          <div className="group w-fit mx-auto">
            <button
              className="w-20 h-20 rounded-full group-hover:border-[#fdc800] flex items-center justify-center border-2 border-white transition-all duration-300 mx-auto"
              onClick={openModal}
              aria-label="Xem video tour khuôn viên"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center">
                <FaPlay
                  className="text-[#fdc800] group-hover:text-white ml-1 transition-all duration-300"
                  size={20}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={showModal}
        onClose={closeModal}
        videoId={videoData?.idVideo || ""}
        title={videoData?.title}
      />
    </>
  );
};
