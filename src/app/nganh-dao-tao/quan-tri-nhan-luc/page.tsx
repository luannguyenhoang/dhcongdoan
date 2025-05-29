"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_QUAN_TRI_NHAN_LUC } from "@/app/api/graphQL/getQuanTriNhanLuc";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function QuanTriNhanLuc() {
  const [courseData, setCourseData] = useState(null);
  const [nganhHocData, setNganhHocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await getData(GET_QUAN_TRI_NHAN_LUC);
        const nganhHocResponse = await getData(GET_ALL_NGANH_HOC);

        if (!courseResponse || !nganhHocResponse) {
          throw new Error("No data returned from API");
        }

        setCourseData(courseResponse?.pageBy?.quanTriNhanLuc?.content);
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
