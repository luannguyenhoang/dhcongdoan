"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_NGANH_HOC_CHI_TIET } from "@/app/api/graphQL/getNganhHocChiTiet";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

export default function CongTacXaHoi() {
  const [courseData, setCourseData] = useState(null);
  const [nganhHocData, setNganhHocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await getData(GET_NGANH_HOC_CHI_TIET, {
          uri: "nganh-dao-tao/cong-tac-xa-hoi"
        });
        const nganhHocResponse = await getData(GET_ALL_NGANH_HOC);
        if (!courseResponse || !nganhHocResponse) {
          throw new Error("No data returned from API");
        }
        setCourseData(courseResponse?.pageBy);
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
