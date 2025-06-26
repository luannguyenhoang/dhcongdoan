"use client";

import { DEFAULT_INSTRUCTORS } from "@/data/DefaultData";
import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const InstructorCarousel = ({ data }: { data?: any }) => {
  const instructorData = data || DEFAULT_INSTRUCTORS;
  const swiperRef = useRef(null);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl  font-medium text-[#002147]">
            Lợi ích hệ học từ xa
          </h2>
          <div className="flex gap-2">
            <button
              className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-white rounded-sm"
              onClick={() => (swiperRef.current as any)?.slidePrev()}
              aria-label="Lợi ích hệ học từ xa trước"
            >
              <FaChevronLeft />
            </button>
            <button
              className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-white rounded-sm"
              onClick={() => (swiperRef.current as any)?.slideNext()}
              aria-label="Lợi ích hệ học từ xa tiếp theo"
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
          {instructorData?.map((instructor: any, index: number) => (
            <SwiperSlide key={index}>
              <div>
                <div className="h-64 relative overflow-hidden group">
                  <Image
                    src={
                      instructor?.avatar?.node?.mediaItemUrl || "/no-image.jpeg"
                    }
                    alt={`Ảnh giảng viên: ${instructor?.name || "Instructor"}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="py-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {instructor.name}
                  </h3>
                  <p className="text-gray-600">{instructor.role}</p>
                  <div className="w-12 h-1 bg-yellow-400 mt-2"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
