"use client";

import { IndustryGroup } from "@/types/types";
import { toSlug } from "@/utils/toSlug";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CourseCard = dynamic(() =>
  import("@/app/components/atoms/CourseCard").then((mod) => mod.CourseCard)
);

export const RelatedCourses = ({ data }: { data: IndustryGroup[] }) => {
  const swiperRef = useRef(null);
  return (
    <div className="relative ">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center bg-white p-4 my-5">
          <h2 className="text-2xl  font-medium text-[#002147]">
            Các ngành đào tạo
          </h2>
          <div className="flex gap-2">
            <button
              className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-white rounded-sm"
              onClick={() => (swiperRef.current as any)?.slidePrev()}
              aria-label="Ngành đào tạo trước"
            >
              <FaChevronLeft />
            </button>
            <button
              className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-white rounded-sm"
              onClick={() => (swiperRef.current as any)?.slideNext()}
              aria-label="Ngành đào tạo tiếp theo"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            (swiperRef as any).current = swiper;
          }}
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={2}
          loop={true}
          breakpoints={{
            480: {
              slidesPerView: 2
            },
            640: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            },
            1024: {
              slidesPerView: 4
            }
          }}
          className="instructor-swiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <CourseCard
                title={item?.industryname || ""}
                desc={item?.description || ""}
                image={item?.image?.node?.mediaItemUrl || "#"}
                path={`/nganh-dao-tao/${toSlug(item?.industryname || "")}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
