"use client";

import { useEffect, useState } from "react";
import { CountdownTimer } from "@/app/components/molecules/CountdownTimer";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { getData } from "@/lib/getData";
import { GET_LICH_KHAI_GIANG } from "@/app/api/graphQL/getLichKhaiGiang";

export default function LichKhaiGiang() {
  const [eventData, setEventData] = useState({
    title: "",
    date: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(GET_LICH_KHAI_GIANG);
        
        if (data?.pageBy?.trangChu?.openingschedule) {
          const { title, date } = data.pageBy.trangChu.openingschedule;
          setEventData({
            title,
            date
          });
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
        backgroundImage="/image11.webp"
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Lịch khai giảng" },
        ]}
      />
      
      {loading ? (
        <div className="flex justify-center items-center py-28">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002147]"></div>
        </div>
      ) : (
        <CountdownTimer 
          title={eventData.title} 
          date={eventData.date} 
        />
      )}
    </>
  );
}
