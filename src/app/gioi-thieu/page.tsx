"use client";

import { GET_GIOI_THIEU } from "@/app/api/graphQL/getGioiThieu";
import { GET_TRANG_CHU } from "@/app/api/graphQL/getTrangChu";
import { getData } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);
const AboutSection = dynamic(() =>
  import("@/app/components/molecules/AboutSection").then(
    (mod) => mod.AboutSection
  )
);
const PageBanner = dynamic(() =>
  import("@/app/components/molecules/PageBanner").then((mod) => mod.PageBanner)
);
const WhyChooseUs = dynamic(() =>
  import("@/app/components/molecules/WhyChooseUs").then(
    (mod) => mod.WhyChooseUs
  )
);
const InstructorCarousel = dynamic(() =>
  import("@/app/components/organisms/InstructorCarousel").then(
    (mod) => mod.InstructorCarousel
  )
);
const StatisticsCounter = dynamic(() =>
  import("@/app/components/organisms/StatisticsCounter").then(
    (mod) => mod.StatisticsCounter
  )
);

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
