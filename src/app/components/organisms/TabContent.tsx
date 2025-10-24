"use client";

import Image from "next/image";
import { useState } from "react";

interface Tab {
  title: string;
  content: string[];
}

interface TabContentProps {
  data?: any;
}

export const TabContent = ({ data }: TabContentProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const informationData = data?.information;
  const finalTabs = informationData?.items || [];

  return (
    <div className="w-full relative">
      <Image
        src="/bg-ss4.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold text-white mb-2"
              style={{ textShadow: "3px 3px 0px #000000" }}
            >
              {informationData?.title ||
                "Thông Tin TUYỂN SINH TRƯỜNG ĐẠI HỌC CÔNG ĐOÀN"}
            </h1>
            <p className="text-white text-lg">
              {informationData?.text ||
                "Xét tuyển theo bằng cấp học viên đang có"}
            </p>
          </div>

          {/* Navigation Tabs */}

          <div className="flex flex-wrap lg:justify-between rounded-lg p-1 justify-center w-full gap-2 mb-1">
            {finalTabs.map((tab: any, index: number) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`lg:px-6 px-1 py-3 lg:text-lg text-xs rounded-md font-semibold transition-all duration-300 w-fit ${
                  activeTab === index
                    ? "bg-[#52cce7] text-black"
                    : "text-white bg-[#01235a]"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-2xl h-[642.531px] lg:h-[362.531px] border-2 border-dashed border-white relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left Content */}
              <div className="p-6 flex flex-col justify-between h-full lg:h-full">
                <div>
                  <div
                    className="text-2xl font-bold mb-6"
                    dangerouslySetInnerHTML={{
                      __html: finalTabs[activeTab]?.text || ""
                    }}
                  />
                  <div className="space-y-1">
                    {finalTabs[activeTab]?.item
                      ?.split("\r\n")
                      .filter((line: string) => line.trim())
                      .map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex items-center justify-center h-full ">
                <div className="relative w-full h-[200px] lg:h-full">
                  <Image
                    src={
                      data?.information?.images?.node?.mediaItemUrl ||
                      "/group.png"
                    }
                    alt="Students"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0">
              <Image
                src="/img-line.png"
                alt="Decorative line"
                width={1000}
                height={20}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
