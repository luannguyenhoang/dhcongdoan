"use client";

import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { LoadingListPost } from "@/app/components/atoms/LoadingListPost";
import DefaultLayout from "@/app/components/template/LayoutDefault";
import { getData } from "@/lib/getData";
import { IndustryGroup } from "@/types/types";
import { toSlug } from "@/utils/toSlug";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);
const CourseCard = dynamic(() =>
  import("@/app/components/atoms/CourseCard").then((mod) => mod.CourseCard)
);
const PageBanner = dynamic(() =>
  import("@/app/components/molecules/PageBanner").then((mod) => mod.PageBanner)
);
const SliderBar = dynamic(() =>
  import("@/app/components/organisms/SliderBar").then((mod) => mod.SliderBar)
);

export default function Page() {
  const [nganhHoc, setNganhHoc] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  const bannerUrl = nganhHoc?.banner?.node?.mediaItemUrl || "/image11.webp";
  const industryGroups: IndustryGroup[] = nganhHoc?.industrygroups || [];

  const normalizeText = (text: string = "") => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^\w\s]/gi, "")
      .trim();
  };

  const filteredIndustryGroups = industryGroups.filter((industry) => {
    if (searchTerm === "") return true;

    const normalizedSearchTerm = normalizeText(searchTerm);
    const normalizedName = normalizeText(industry.industryname || "");
    const normalizedDesc = normalizeText(industry.description || "");

    return (
      normalizedName.includes(normalizedSearchTerm) ||
      normalizedDesc.includes(normalizedSearchTerm)
    );
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title={nganhHoc?.title || "Ngành đào tạo"}
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: nganhHoc?.title || "Ngành đào tạo" }
        ]}
      />
      <div className="py-24">
        <DefaultLayout>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-1 lg:hidden mb-6">
              <SliderBar
                showCustomSearch={true}
                onSearch={handleSearch}
                showVideoMajorDetail={false}
                showAllMajor={false}
                showRegister={false}
                showForm={false}
                showNewPost={false}
              />
            </div>

            <div className="lg:col-span-9 lg:px-0">
              <div className="flex flex-col gap-4">
                {searchTerm && (
                  <div className="mb-4 p-4 bg-gray-50 flex justify-between rounded-md border border-gray-200">
                    <p className="text-gray-700">
                      {filteredIndustryGroups.length > 0
                        ? `Tìm thấy ${filteredIndustryGroups.length} ngành học phù hợp với từ khóa "${searchTerm}"`
                        : `Không tìm thấy ngành học nào phù hợp với từ khóa "${searchTerm}"`}
                    </p>
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      onClick={clearSearch}
                      aria-label="Xóa kết quả tìm kiếm"
                    >
                      <FaTimes size={12} /> Xóa tìm kiếm
                    </button>
                  </div>
                )}

                {loading && <LoadingListPost count={6} col={3} />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                  {filteredIndustryGroups.length > 0
                    ? filteredIndustryGroups.map(
                        (industry: IndustryGroup, index: number) => (
                          <CourseCard
                            key={index}
                            title={industry.industryname || ""}
                            desc={industry.description || ""}
                            image={industry.image?.node?.mediaItemUrl || ""}
                            path={`/nganh-dao-tao/${toSlug(
                              industry.industryname || ""
                            )}`}
                          />
                        )
                      )
                    : !loading && (
                        <div className="col-span-3 h-[300px] flex items-center justify-center text-center text-gray-500">
                          {searchTerm
                            ? "Không tìm thấy ngành học nào phù hợp với từ khóa"
                            : "Chưa có ngành học nào"}
                        </div>
                      )}
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:hidden mt-10">
              <SliderBar
                showCustomSearch={false}
                onSearch={undefined}
                showVideoMajorDetail={false}
                showAllMajor={false}
                showRegister={false}
                showForm={true}
                showNewPost={false}
              />
            </div>

            <div className="sidebar-posts lg:col-span-3 hidden lg:block">
              <SliderBar
                showCustomSearch={true}
                onSearch={handleSearch}
                showVideoMajorDetail={false}
                showAllMajor={false}
                showRegister={false}
                showForm={true}
                showNewPost={false}
              />
            </div>
          </div>
        </DefaultLayout>
      </div>
    </>
  );
}
