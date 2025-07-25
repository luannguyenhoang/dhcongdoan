"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { VideoModal } from "@/app/components/molecules/VideoModal";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

export const VideoMajorDetail = () => {
  const [showModal, setShowModal] = useState(false);

  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(GET_ALL_NGANH_HOC);
      setVideo(data?.pageBy?.trangChu?.trainingIndustry?.video);
    };
    fetchData();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="mb-8 relative border border-gray-200 py-12 px-5">
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${video?.image?.node?.mediaItemUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />

        <div className="relative z-20 text-center text-white max-w-3xl px-4">
          <div className="group w-fit mx-auto">
            <button
              className="w-14 h-14 rounded-full group-hover:border-[#fdc800] flex items-center justify-center border-2 border-white transition-all duration-300 mx-auto"
              onClick={openModal}
              aria-label="Xem video giới thiệu ngành học"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center">
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
        videoId={video?.idVideo}
        title={"Video Tour"}
      />
    </>
  );
};
