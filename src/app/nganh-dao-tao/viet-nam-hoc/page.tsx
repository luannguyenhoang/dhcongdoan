"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_VIET_NAM_HOC } from "@/app/api/graphQL/getVietNamHoc";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function VietNamHoc() {
  const [courseData, setCourseData] = useState(null);
  const [nganhHocData, setNganhHocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!GET_VIET_NAM_HOC || !GET_ALL_NGANH_HOC) {
          throw new Error("GraphQL queries are not defined");
        }

        const courseResponse = await getData(GET_VIET_NAM_HOC);
        if (!courseResponse) {
          throw new Error("Failed to fetch Vietnam Studies course data");
        }

        const nganhHocResponse = await getData(GET_ALL_NGANH_HOC);
        if (!nganhHocResponse) {
          throw new Error("Failed to fetch training industry data");
        }

        setCourseData(courseResponse?.pageBy?.vietNamHoc?.content);
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
