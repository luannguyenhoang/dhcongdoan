"use client";

import { GET_GIOI_THIEU } from "@/app/api/graphQL/getGioiThieu";
import { GET_TRANG_CHU } from "@/app/api/graphQL/getTrangChu";
import { AboutSection } from "@/app/components/molecules/AboutSection";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { WhyChooseUs } from "@/app/components/molecules/WhyChooseUs";
import { InstructorCarousel } from "@/app/components/organisms/InstructorCarousel";
import { StatisticsCounter } from "@/app/components/organisms/StatisticsCounter";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
import FormPopup from "@/app/components/molecules/FormPopup";

export default function AboutUs() {
  const [homeData, setHomeData] = useState<any>(null);
  const [gioiThieuData, setGioiThieuData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(GET_TRANG_CHU);
        const gioiThieuData = await getData(GET_GIOI_THIEU);
        if (!data) {
          throw new Error("No data returned from API");
        }
        setHomeData(data);
        setGioiThieuData(gioiThieuData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();

    // Set timer to show popup after 12 seconds
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);
  const TeacherData = homeData?.pageBy?.trangChu?.teacher;
  const whyChooseUsData =
    gioiThieuData?.pageBy?.gioiThieu?.introduce?.whychooseourinstitution;
  const ParameterData = homeData?.pageBy?.trangChu?.parameter;

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title={
          gioiThieuData?.pageBy?.gioiThieu?.introduce?.title || "Giới thiệu"
        }
        backgroundImage={
          gioiThieuData?.pageBy?.gioiThieu?.introduce?.banner?.node
            ?.mediaItemUrl || "/image11.webp"
        }
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          {
            label:
              gioiThieuData?.pageBy?.gioiThieu?.introduce?.title || "Giới thiệu"
          }
        ]}
      />
      <AboutSection data={gioiThieuData?.pageBy?.gioiThieu?.introduce} />
      <WhyChooseUs data={whyChooseUsData} />
      <StatisticsCounter data={ParameterData} />
      <InstructorCarousel data={TeacherData} />
    </>
  );
}
