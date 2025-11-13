"use client";

import { GET_TRANG_CHU } from "@/app/api/graphQL/getTrangChu";
import { getData } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";

// Popup component (rendered conditionally)
const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);

// Try Now Button component
const TryNowButton = dynamic(() =>
  import("@/app/components/atoms/TryNowButton").then((mod) => mod.TryNowButton)
);

// Main page components in display order - optimized with SSR settings
const Slider = dynamic(
  () => import("@/app/components/organisms/Slider").then((mod) => mod.Slider),
  { ssr: true } // Critical above-the-fold content
);

// Defer non-critical components - chỉ load khi cần thiết
// Giảm Script Evaluation và Parsing time ngay từ đầu
const CategoryGrid = dynamic(
  () =>
    import("@/app/components/organisms/CategoryGrid").then(
      (mod) => mod.CategoryGrid
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[200px]" /> // Placeholder để tránh layout shift
  }
);

const TabContent = dynamic(
  () =>
    import("@/app/components/organisms/TabContent").then(
      (mod) => mod.TabContent
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />
  }
);

const CertificateSection = dynamic(
  () =>
    import("@/app/components/organisms/CertificateSection").then(
      (mod) => mod.CertificateSection
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[300px]" />
  }
);

const LearningMethodSection = dynamic(
  () =>
    import("@/app/components/organisms/LearningMethodSection").then(
      (mod) => mod.LearningMethodSection
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[300px]" />
  }
);

const RegistrationBanner = dynamic(
  () =>
    import("@/app/components/organisms/RegistrationBanner").then(
      (mod) => mod.RegistrationBanner
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[200px]" />
  }
);

const OpeningScheduleSection = dynamic(
  () =>
    import("@/app/components/organisms/OpeningScheduleSection").then(
      (mod) => mod.OpeningScheduleSection
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />
  }
);

// Swiper là library nặng, defer hoàn toàn
const InstructorCarousel = dynamic(
  () =>
    import("@/app/components/organisms/InstructorCarousel").then(
      (mod) => mod.InstructorCarousel
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[300px]" />
  }
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
      {/* Critical above-the-fold content - load ngay */}
      <Slider data={SliderData} loading={isLoading} />

      {/* Defer non-critical components - chỉ load khi browser rảnh */}
      {/* Sử dụng Suspense để tránh blocking render */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <CategoryGrid data={TrainingIndustryData} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <TabContent data={TabContentData} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[300px]" />}>
        <CertificateSection data={CertificateSectionData} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[300px]" />}>
        <LearningMethodSection data={LearningMethodSectionData} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <RegistrationBanner data={RegistrationBannerData} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <OpeningScheduleSection data={OpeningScheduleSectionData} />
      </Suspense>

      {/* Defer Swiper - library nặng nhất */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <InstructorCarousel
          data={TeacherData}
          title={homeData?.pageBy?.trangChu?.title}
        />
      </Suspense>

      <TryNowButton onClick={() => setShowTryNowPopup(true)} />
    </>
  );
}
