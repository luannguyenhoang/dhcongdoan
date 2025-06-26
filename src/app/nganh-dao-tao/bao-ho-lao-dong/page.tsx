"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_BAO_HO_LAO_DONG } from "@/app/api/graphQL/getBaoHoLaoDong";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function BaoHoLaoDong() {
  const [courseData, setCourseData] = useState(null);
  const [nganhHocData, setNganhHocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await getData(GET_BAO_HO_LAO_DONG);
        const nganhHocResponse = await getData(GET_ALL_NGANH_HOC);

        if (!courseResponse || !nganhHocResponse) {
          throw new Error("No data returned from API");
        }

        setCourseData(courseResponse?.pageBy?.baoHoLaoDong?.content);
        setNganhHocData(
          nganhHocResponse?.pageBy?.trangChu?.trainingIndustry || {}
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TrainingIndustryDetailLayout
      courseData={courseData}
      nganhHocData={nganhHocData}
    />
  );
}
