"use client";

import {
  GET_CONTENT_LICH_KHAI_GIANG,
  GET_LICH_KHAI_GIANG
} from "@/app/api/graphQL/getLichKhaiGiang";
import { CountdownTimer } from "@/app/components/molecules/CountdownTimer";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { getData } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FormWrapper = dynamic(() =>
  import("@/app/components/molecules/FormWrapper").then(
    (mod) => mod.FormWrapper
  )
);

export default function LichKhaiGiang() {
  const [eventData, setEventData] = useState({
    title: "",
    dateOpen: ""
  });
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    title: "",
    title2: "",
    item: "",
    description: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(GET_LICH_KHAI_GIANG);
        const contentData = await getData(GET_CONTENT_LICH_KHAI_GIANG);
        if (data?.pageBy?.trangChu?.openingschedule) {
          const { title, dateOpen } = data.pageBy.trangChu.openingschedule;
          setEventData({
            title,
            dateOpen
          });
        }
        if (contentData?.pageBy?.lichKhaiGiang?.content) {
          setContent(contentData.pageBy.lichKhaiGiang.content);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageBanner
        title="Lịch khai giảng"
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Lịch khai giảng" }
        ]}
      />

      {loading ? (
        <div className="flex justify-center items-center py-28">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002147]"></div>
        </div>
      ) : (
        <>
          <CountdownTimer date={eventData?.dateOpen} />
          <div className="h-fit bg-white px-6 py-10 md:px-20 md:py-16">
            <div className="pb-10">
              <h1 className="text-[#002147] lg:text-3xl md:text-2xl text-xl font-bold uppercase mb-4 text-center">
                {content.title2 || "Lịch khai giảng"}
              </h1>
              <h2 className="text-xl md:text-2xl text-[#002147] font-semibold mb-6 text-center">
                {content.description}
              </h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <ul className="space-y-3 text-gray-800">
                  {content.item &&
                    content.item.split("\r\n").map((item, index) => (
                      <li key={index} className="flex">
                        <span className="text-yellow-500 mr-2">✓</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h1 className="text-blue-900 text-xl md:text-3xl font-medium mb-4 text-center">
                  Đăng ký để nhận tư vấn
                </h1>
                <FormWrapper type="form-main" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
