"use client";

import { whyChooseUsData } from "@/data/DefaultData";
import { FaBook, FaGraduationCap, FaUser } from "react-icons/fa";

interface Feature {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  data?: {
    title?: string;
    description?: string;
    feature?: Feature[];
  };
}

export const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const title = data?.title || whyChooseUsData.title;
  const description = data?.description || whyChooseUsData.description;

  const getIconByIndex = (index: number) => {
    switch (index) {
      case 0:
        return <FaGraduationCap size={40} className="text-[#002147]" />;
      case 1:
        return <FaUser size={40} className="text-[#002147]" />;
      case 2:
        return <FaBook size={40} className="text-[#002147]" />;
      default:
        return <FaGraduationCap size={40} className="text-[#002147]" />;
    }
  };

  const features = data?.feature || whyChooseUsData.feature;
  return (
    <section className="py-24 bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium text-[#002147] mb-4">{title}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 hover:bg-[#fdc800] hover:text-[#002147] transition-all duration-300 bg-[#eeeeee] rounded-full flex items-center justify-center mb-6">
                {getIconByIndex(index)}
              </div>
              <h3 className="text-xl font-medium text-[#002147] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-semibold">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
