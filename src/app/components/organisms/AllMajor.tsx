"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { getData } from "@/lib/getData";
import { IndustryGroup } from "@/types/types";
import { toSlug } from "@/utils/toSlug";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AllMajor = () => {
  const [nganhHoc, setNganhHoc] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(GET_ALL_NGANH_HOC);
        if (!data) {
          throw new Error("No data returned from API");
        }
        setNganhHoc(data?.pageBy?.trangChu?.trainingIndustry || {});
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const industryGroups: IndustryGroup[] = nganhHoc?.industrygroups || [];

  return (
    <div>
      <div className="mb-8 border border-gray-200 py-7 px-5">
        <h2 className="text-[#002147] text-2xl font-medium mb-2">
          Ngành Đào Tạo
        </h2>
        <div className="border-b-4 border-yellow-400 w-12 mb-4"></div>
        <div className="space-y-4 mt-4">
          {industryGroups.length > 0 ? (
            industryGroups.map((industry, index) => (
              <Link
                key={index}
                href={`/nganh-dao-tao/${toSlug(industry.industryname || "/")}`}
                className="relative block h-24 w-full  overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#00214755] to-[#002147] z-10"></div>
                <div className="absolute inset-0 z-0">
                  {industry.image?.node?.mediaItemUrl ? (
                    <Image
                      src={industry.image?.node?.mediaItemUrl}
                      alt={`Ngành học: ${industry.industryname || ""}`}
                      width={300}
                      height={100}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#002147]/30"></div>
                  )}
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
                  <h3 className="text-white font-medium text-center text-lg group-hover:text-[#fdc800] transition-colors">
                    {industry.industryname}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              Dữ liệu đang được chúng tôi cập nhật
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
