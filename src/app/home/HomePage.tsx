"use client";
import { GET_TRANG_CHU } from "@/app/api/graphQL/getTrangChu";
import { CampusWelcome } from "@/app/components/organisms/CampusWelcome";
import Slider from "@/app/components/organisms/Slider";
import { getData } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FormPopup from "@/app/components/molecules/FormPopup";

const CategoryGrid = dynamic(() =>
  import("@/app/components/organisms/CategoryGrid").then(
    (mod) => mod.CategoryGrid
  )
);

const CampusVideoTour = dynamic(() =>
  import("@/app/components/organisms/CampusVideoTour").then(
    (mod) => mod.CampusVideoTour
  )
);

const InstructorCarousel = dynamic(() =>
  import("@/app/components/organisms/InstructorCarousel").then(
    (mod) => mod.InstructorCarousel
  )
);

const LatestPostsSection = dynamic(() =>
  import("@/app/components/organisms/LatestPostsSection").then(
    (mod) => mod.LatestPostsSection
  )
);

const StatisticsCounter = dynamic(() =>
  import("@/app/components/organisms/StatisticsCounter").then(
    (mod) => mod.StatisticsCounter
  )
);

const StudentTestimonials = dynamic(() =>
  import("@/app/components/organisms/StudentTestimonials").then(
    (mod) => mod.StudentTestimonials
  )
);

const OpeningScheduleBanner = dynamic(() =>
  import("@/app/components/organisms/OpeningScheduleBanner").then(
    (mod) => mod.OpeningScheduleBanner
  )
);

const PartnerLogos = dynamic(() =>
  import("@/app/components/organisms/PartnerLogos").then(
    (mod) => mod.PartnerLogos
  )
);

export default function HomePage() {
  const [homeData, setHomeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

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
        console.error("Error fetching event data:", error);
        setError("Error fetching event data");
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 15000);

    // Set timer to show popup after 12 seconds
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    fetchData();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(popupTimerId);
    };
  }, []);

  const SliderData = homeData?.pageBy?.trangChu?.slider;
  const OpeningScheduleData = homeData?.pageBy?.trangChu?.openingschedule;
  const WelcomeToData = homeData?.pageBy?.trangChu?.welcometo;
  const TrainingIndustryData = homeData?.pageBy?.trangChu?.trainingIndustry;
  const TourData = homeData?.pageBy?.trangChu?.videoTour;
  const TeacherData = homeData?.pageBy?.trangChu?.teacher;
  const ParameterData = homeData?.pageBy?.trangChu?.parameter;
  const EvaluateData = homeData?.pageBy?.trangChu?.evaluate;
  const CooperationUnitData = homeData?.pageBy?.trangChu?.cooperationunit;
  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <Slider data={SliderData} loading={isLoading} />
      <CampusWelcome data={WelcomeToData} />
      <CategoryGrid data={TrainingIndustryData} />
      <CampusVideoTour data={TourData} />
      <InstructorCarousel data={TeacherData} />
      <LatestPostsSection />
      <StatisticsCounter data={ParameterData} />
      <StudentTestimonials data={EvaluateData} />
      <OpeningScheduleBanner data={OpeningScheduleData} />
      <PartnerLogos data={CooperationUnitData} />
    </>
  );
}
