"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_SIDE_BAR } from "@/app/api/graphQL/getSideBar";
import { FormWrapper } from "@/app/components/molecules/FormWrapper";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlay } from "react-icons/fa";
import { VideoModal } from "./VideoModal";

type SidebarItem = {
  icon: string;
  text: string;
};

export const Register = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [video, setVideo] = useState<any>(null);
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await getData(GET_SIDE_BAR);
        if (response?.allSlideBar?.nodes?.[0]?.sliderBarContent?.sideBar) {
          setSidebarItems(
            response.allSlideBar.nodes[0].sliderBarContent.sideBar
          );
        }
        const data = await getData(GET_ALL_NGANH_HOC);
        setVideo(data?.pageBy?.trangChu?.trainingIndustry?.video);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const topItems = sidebarItems.slice(0, 3);
  const bottomItems = sidebarItems.slice(3);

  return (
    <div className="mb-8 border border-gray-200 py-5 px-5">
      <div className="mb-8 relative border border-gray-200 py-12 px-5">
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${video?.image?.node?.mediaItemUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
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
      <div>
        {/* <h2 className="text-[#002147] text-2xl font-medium mb-2">
          Tư Vấn Ngành
        </h2>
        <div className="border-b-4 border-yellow-400 w-12 mb-4"></div> */}

        {!loading && topItems.length > 0 && (
          <div className="flex flex-col gap-1 mb-4">
            {topItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-1.5 ${
                  index !== topItems.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-lg mr-1">{item.icon}</span>
                </div>
                <span className="text-sm text-gray-700">{item.text}</span>{" "}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 my-4">
          <button
            onClick={() => setShowPopup(true)}
            className="w-full py-3 px-4 bg-[#02c39a] text-white font-semibold uppercase rounded-full"
          >
            Tư vấn ngành
          </button>
        </div>

        {!loading && bottomItems.length > 0 && (
          <div className="flex flex-col gap-1 mt-3">
            {bottomItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-1.5 ${
                  index !== bottomItems.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-lg mr-1">{item.icon}</span>
                </div>
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        )}
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
