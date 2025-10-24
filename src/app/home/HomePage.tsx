"use client";

import { GET_TRANG_CHU } from "@/app/api/graphQL/getTrangChu";
import { getData } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Popup component (rendered conditionally)
const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);

// Try Now Button component
const TryNowButton = dynamic(() =>
  import("@/app/components/atoms/TryNowButton").then((mod) => mod.TryNowButton)
);

// Main page components in display order
const Slider = dynamic(() =>
  import("@/app/components/organisms/Slider").then((mod) => mod.Slider)
);

const CategoryGrid = dynamic(() =>
  import("@/app/components/organisms/CategoryGrid").then(
    (mod) => mod.CategoryGrid
  )
);

const TabContent = dynamic(() =>
  import("@/app/components/organisms/TabContent").then((mod) => mod.TabContent)
);

const CertificateSection = dynamic(() =>
  import("@/app/components/organisms/CertificateSection").then(
    (mod) => mod.CertificateSection
  )
);

const LearningMethodSection = dynamic(() =>
  import("@/app/components/organisms/LearningMethodSection").then(
    (mod) => mod.LearningMethodSection
  )
);

const RegistrationBanner = dynamic(() =>
  import("@/app/components/organisms/RegistrationBanner").then(
    (mod) => mod.RegistrationBanner
  )
);

const OpeningScheduleSection = dynamic(() =>
  import("@/app/components/organisms/OpeningScheduleSection").then(
    (mod) => mod.OpeningScheduleSection
  )
);

const InstructorCarousel = dynamic(() =>
  import("@/app/components/organisms/InstructorCarousel").then(
    (mod) => mod.InstructorCarousel
  )
);

export default function HomePage() {
  const [homeData, setHomeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showTryNowPopup, setShowTryNowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(GET_TRANG_CHU);
        if (!data) {
          throw new Error("No data returned from API");
        }
        setHomeData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching event data");
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 15000);

    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    fetchData();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(popupTimerId);
    };
  }, []);

  const SliderData = homeData?.pageBy?.trangChu;
  const TrainingIndustryData = homeData?.pageBy?.trangChu?.trainingIndustry;
  const TeacherData = homeData?.pageBy?.trangChu?.teacher;
  const TabContentData = homeData?.pageBy?.trangChu;
  const CertificateSectionData = homeData?.pageBy?.trangChu;
  const LearningMethodSectionData =
    homeData?.pageBy?.trangChu?.certificateSection;
  const OpeningScheduleSectionData = homeData?.pageBy?.trangChu;
  const RegistrationBannerData = homeData?.pageBy?.trangChu;
  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      {showTryNowPopup && (
        <FormPopup
          showPopup={showTryNowPopup}
          setShowPopup={setShowTryNowPopup}
        />
      )}
      <Slider data={SliderData} loading={isLoading} />
      <CategoryGrid data={TrainingIndustryData} />
      <TabContent data={TabContentData} />
      <CertificateSection data={CertificateSectionData} />
      <LearningMethodSection data={LearningMethodSectionData} />
      <RegistrationBanner data={RegistrationBannerData} />
      <OpeningScheduleSection data={OpeningScheduleSectionData} />
      <InstructorCarousel
        data={TeacherData}
        title={homeData?.pageBy?.trangChu?.title}
      />
      <TryNowButton onClick={() => setShowTryNowPopup(true)} />
    </>
  );
}
