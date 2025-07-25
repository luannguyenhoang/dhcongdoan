"use client";

import { Avatar } from "@/app/components/atoms/Avatar";
import { TestimonialItemProps } from "@/types/types";

export const TestimonialItem = ({
  name,
  role,
  image,
  content
}: TestimonialItemProps) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-center justify-between gap-8 mx-auto bg-[#f8f8f8] p-4">
      <div className="w-full md:w-1/3 order-1 md:order-2 flex justify-center">
        <div className="flex flex-col items-center h-fit">
          <Avatar src={image} alt={`Ảnh đại diện của ${name}`} size={80} />
          <div className="mt-4 md:mt-0 h-fit">
            <h3 className="text-lg font-semibold text-[#002147]">{name}</h3>
            <p className="text-gray-500">{role}</p>
          </div>
        </div>
      </div>
      <div className="w-full order-2 md:order-1 md:w-2/3 text-center md:text-left flex items-center">
        <div className="text-gray-700 leading-relaxed">{content}</div>
      </div>
    </div>
  );
};
