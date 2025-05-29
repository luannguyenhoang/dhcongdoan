"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_LUAT } from "@/app/api/graphQL/getLuat";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function Luat() {
  const [courseData, setCourseData] = useState(null);
  const [nganhHocData, setNganhHocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await getData(GET_LUAT);
        const nganhHocResponse = await getData(GET_ALL_NGANH_HOC);
        if (!courseResponse) {
          throw new Error("Failed to fetch Luat course data");
        }
        if (!nganhHocResponse) {
          throw new Error("Failed to fetch training industry data");
        }

        setCourseData(courseResponse?.pageBy?.luat?.content);
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
