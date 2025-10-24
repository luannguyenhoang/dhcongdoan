"use client";

import { GET_SIDE_BAR } from "@/app/api/graphQL/getSideBar";
import { getData } from "@/lib/getData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type SidebarItem = {
  icon: string;
  textLeft: string;
  textRight: string;
};

export const Register = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState<string>("");
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await getData(GET_SIDE_BAR);
        if (response?.allSlideBar?.nodes?.[0]?.sliderBarContent) {
          const sliderContent = response.allSlideBar.nodes[0].sliderBarContent;

          // Set banner image
          if (sliderContent.image?.node?.mediaItemUrl) {
            setBannerImage(sliderContent.image.node.mediaItemUrl);
          }

          // Set sidebar items
          if (sliderContent.sideBar) {
            setSidebarItems(sliderContent.sideBar);
          }
        }
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

  return (
    <div className="">
      {bannerImage && (
        <div className="mb-8 relative shadow-2xl">
          <Image
            src={bannerImage}
            width={400}
            height={400}
            alt="image-banner"
          />
        </div>
      )}
      <div>
        {!loading && sidebarItems.length > 0 && (
          <div className="flex flex-col mb-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-1 ${
                  index !== sidebarItems.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-500">{item.textLeft}</span>
                </div>
                <span className="text-sm text-gray-500">{item.textRight}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 className="text-[#002147] text-2xl font-medium mb-1">
        ĐĂNG KÝ TẠI ĐÂY!
      </h2>
      <div className="mb-2 text-[#5aaae7]">
        Để lại thông tin chúng tôi sẽ gọi ngay cho bạn
      </div>
      <div className="border-b-4 border-yellow-400 w-12 mb-4"></div>
      <FormWrapper type="form-main" />
    </div>
  );
};
