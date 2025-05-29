"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_NGON_NGU_ANH } from "@/app/api/graphQL/getNgonNguAnh";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";

import { getData } from "@/lib/getData";

import { useEffect } from "react";

import { useState } from "react";

export default function NgonNguAnh() {
  const [courseData, setCourseData] = useState(null);
  const [nganhHocData, setNganhHocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await getData(GET_NGON_NGU_ANH);
        const nganhHocResponse = await getData(GET_ALL_NGANH_HOC);

        if (!courseResponse || !nganhHocResponse) {
          throw new Error("No data returned from API");
        }

        setCourseData(courseResponse?.pageBy?.ngonNguAnh?.content);
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
