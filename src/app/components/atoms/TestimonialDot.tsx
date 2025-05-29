"use client";

import { TestimonialDotProps } from "@/types/types";

export const TestimonialDot = ({ active, onClick }: TestimonialDotProps) => {
  return (
    <button
      className={`w-6 h-3 mx-1 rounded-full transition-all ${
        active ? "bg-[#002147]" : "bg-gray-300"
      }`}
      onClick={onClick}
      aria-label={active ? "Current slide" : "Go to slide"}
    />
  );
};
