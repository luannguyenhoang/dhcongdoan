"use client";

import { TestimonialDot } from "@/app/components/atoms/TestimonialDot";
import { TestimonialPaginationProps } from "@/types/types";

export const TestimonialPagination = ({
  count,
  activeIndex,
  onDotClick
}: TestimonialPaginationProps) => {
  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: count }).map((_, index) => (
        <TestimonialDot
          key={index}
          active={index === activeIndex}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  );
};
