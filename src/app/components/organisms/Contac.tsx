"use client";

import { GET_LIEN_HE } from "@/app/api/graphQL/getLienHe";
import { getData } from "@/lib/getData";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const FormPopup = dynamic(() =>
  import("@/app/components/molecules/FormPopup").then((mod) => mod.FormPopup)
);
const FormWrapper = dynamic(() =>
  import("@/app/components/molecules/FormWrapper").then(
    (mod) => mod.FormWrapper
  )
);
const PageBanner = dynamic(() =>
  import("@/app/components/molecules/PageBanner").then((mod) => mod.PageBanner)
);

export const Contac = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(GET_LIEN_HE);
        if (!data) {
          throw new Error("No data returned from API");
        }
        setContactData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();

    // Set timer to show popup after 12 seconds
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title={contactData?.pageBy?.lienHe?.contact?.title || "Liên hệ"}
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          {
            label: contactData?.pageBy?.lienHe?.contact?.title || "Liên hệ",
            url: "/lien-he"
          }
        ]}
      />
      <div className="max-w-6xl mx-auto py-8 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#002147] mb-2">
              {contactData?.pageBy?.lienHe?.contact?.titleAdress || "Thông tin"}
            </h2>
            <div className="h-1 w-20 bg-yellow-400 mb-6 md:mb-8"></div>

            <div className="space-y-4 md:space-y-6 flex flex-col justify-between font-medium text-[#002147]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 p-4 md:p-6">
                <FaMapMarkerAlt className="text-yellow-500 text-xl mt-1 sm:mt-0 sm:mr-4 min-w-[1.25rem]" />
                <p className="text-sm md:text-base mt-2 sm:mt-0">
                  {contactData?.pageBy?.lienHe?.contact?.address ||
                    "Đại học Công Đoàn - 169 - Tây Sơn - Đống Đa - Hà Nội"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 p-4 md:p-6">
                <FaEnvelope className="text-yellow-500 text-xl mt-1 sm:mt-0 sm:mr-4 min-w-[1.25rem]" />
                <p className="text-sm md:text-base mt-2 sm:mt-0 break-all">
                  {contactData?.pageBy?.lienHe?.contact?.email ||
                    "dhcongdoan@dhcd.edu.vn"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 p-4 md:p-6">
                <FaPhone className="text-yellow-500 text-xl mt-1 sm:mt-0 sm:mr-4 min-w-[1.25rem]" />
                <p className="text-sm md:text-base mt-2 sm:mt-0">
                  {contactData?.pageBy?.lienHe?.contact?.phone ||
                    "(84-4) 3.857.3204"}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-8 mt-8 md:mt-0">
            <h2 className="text-xl md:text-2xl font-semibold text-[#002147] mb-2">
              {contactData?.pageBy?.lienHe?.contact?.titleForm ||
                "Liên hệ với chúng tôi"}
            </h2>
            <div className="h-1 w-28 bg-yellow-400 mb-6 md:mb-8"></div>

            <FormWrapper type={"form-main"} />
          </div>
        </div>
      </div>
    </>
  );
};
