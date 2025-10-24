"use client";

import { DEFAULT_INSTRUCTORS } from "@/data/DefaultData";
import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const InstructorCarousel = ({
  data,
  title
}: {
  data?: any;
  title?: any;
}) => {
  const instructorData = data || DEFAULT_INSTRUCTORS;
  const swiperRef = useRef(null);

  return (
    <div
      className="py-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/bg-ss8.png)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="lg:text-5xl text-3xl font-extrabold text-[#044ea2] text-center">
            {title}
          </h2>
        </div>
        <div className="relative">
          <button
            className="absolute lg:-left-10 left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white rounded-full shadow-lg"
            onClick={() => (swiperRef.current as any)?.slidePrev()}
            aria-label="Lợi ích hệ học từ xa trước"
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute lg:-right-10 right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white rounded-full shadow-lg"
            onClick={() => (swiperRef.current as any)?.slideNext()}
            aria-label="Lợi ích hệ học từ xa tiếp theo"
          >
            <FaChevronRight />
          </button>
          <Swiper
            onSwiper={(swiper) => {
              (swiperRef as any).current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              480: {
                slidesPerView: 1
              },
              640: {
                slidesPerView: 2
              },
              768: {
                slidesPerView: 3
              },
              1024: {
                slidesPerView: 3
              }
            }}
            className="instructor-swiper"
          >
            {instructorData?.map((instructor: any, index: number) => (
              <SwiperSlide key={index}>
                <div>
                  <div className="h-64 relative overflow-hidden group">
                    <Image
                      src={
                        instructor?.avatar?.node?.mediaItemUrl ||
                        "/no-image.jpeg"
                      }
                      alt={`Ảnh giảng viên: ${instructor?.name || "Instructor"}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
