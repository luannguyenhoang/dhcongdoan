"use client";

import { TestimonialItem } from "@/app/components/molecules/TestimonialItem";
import { TestimonialPagination } from "@/app/components/molecules/TestimonialPagination";
import { DEFAULT_TESTIMONIALS } from "@/data/DefaultData";
import { useCallback, useEffect, useState } from "react";

export const StudentTestimonials = ({ data }: { data?: any }) => {
  const testimonialData = data || DEFAULT_TESTIMONIALS;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (!testimonialData?.comment || testimonialData.comment.length === 0)
      return;

    const timer = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % testimonialData.comment.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonialData?.comment]);

  if (!testimonialData?.comment || testimonialData.comment.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#002147] mb-10">
          {testimonialData.title}
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              display: "flex"
            }}
          >
            {testimonialData.comment.map((testimonial: any, index: number) => (
              <div key={index} className="w-full flex-shrink-0">
                <TestimonialItem
                  name={testimonial.name}
                  role={testimonial.role}
                  image={
                    testimonial.avarta?.node?.mediaItemUrl || "/no-image.jpeg"
                  }
                  content={testimonial.content}
                />
              </div>
            ))}
          </div>
        </div>

        <TestimonialPagination
          count={testimonialData.comment.length}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
        />
      </div>
    </section>
  );
};
