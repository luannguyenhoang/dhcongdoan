"use client";

import { GET_HEADER_AND_FOOTER } from "@/app/api/graphQL/getHeaderAndFooter";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhone,
  FaYoutube
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { menus } from "../../../router/router";

export const Footer = () => {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!GET_HEADER_AND_FOOTER) {
          throw new Error("GraphQL query is undefined");
        }
        const data = await getData(GET_HEADER_AND_FOOTER);
        if (!data) {
          throw new Error("No data returned from API");
        }

        setFooterData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);
  const nganhdaotao = menus.find((item) => item.title === "Ngành đào tạo");
  const footer = footerData?.pageBy?.trangChu?.footer;

  return (
    <footer className="bg-[#002147] text-white pt-16">
      <div className="w-full ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16 lg:place-items-center">
            <div className="space-y-6 md:col-span-3 lg:col-span-1">
              <Link href={"/"} className="flex w-full justify-center">
                <Image
                  src={footer?.logo?.node?.mediaItemUrl || "/logopng.png"}
                  alt="Logo Đại học Công Đoàn"
                  width={110}
                  height={110}
                />
              </Link>
              <p className="text-gray-400 text-sm">
                {footer?.description ||
                  "When an unknown printer took a galley and scrambled it to make specimen book not only five When an unknown printer took a galley and scrambled it to five centurie."}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 relative">
                Khám phá
                <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-yellow-400"></span>
              </h3>
              <ul className="space-y-3 mt-4">
                {menus.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-gray-300 hover:text-[#fdc800] transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 relative">
                Ngành đào tạo
                <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-yellow-400"></span>
              </h3>
              <ul className="space-y-3 mt-4">
                {nganhdaotao?.childs?.map((child) => (
                  <li key={child.title}>
                    <Link
                      href={child.path}
                      className="text-gray-300 hover:text-[#fdc800] transition-colors duration-300"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 relative">
                Liên hệ
                <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-yellow-400" />
              </h3>
              <ul className="space-y-5 mt-4">
                <li className="flex items-start">
                  <div className="mr-3 text-[#fdc800] flex-shrink-0 flex items-center justify-center w-9 h-9">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-[#f5f5f5] font-medium">
                      {footer?.contacts?.titleaddress || "Địa chỉ:"}
                    </p>
                    {footer?.contacts?.address?.map(
                      (addr: { text: string }, index: number) => (
                        <p key={index} className="font-medium">
                          {addr.text}
                        </p>
                      )
                    )}
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-[#fdc800] flex-shrink-0 flex items-center justify-center w-9 h-9">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-[#f5f5f5] font-medium">
                      {footer?.contacts?.titlephone || "Gọi cho chúng tôi :"}
                    </p>
                    <Link
                      href={footer?.contacts?.linkphone || "tel:0438573204"}
                    >
                      <p className="hover:text-[#fdc800] transition-all duration-300 font-medium">
                        {footer?.contacts?.phone || "(+84) 0941577733"}
                      </p>
                    </Link>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-[#fdc800] flex-shrink-0 flex items-center justify-center w-9 h-9">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-[#f5f5f5] font-medium">
                      {footer?.contacts?.titleemail || "Email:"}
                    </p>
                    <Link
                      href={
                        footer?.contacts?.linkemail || "mailto:dttx@dhcd.edu.vn"
                      }
                    >
                      <p className="hover:text-[#fdc800] transition-all duration-300 font-medium break-words">
                        {footer?.contacts?.email || "dttx@dhcd.edu.vn"}
                      </p>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10 pt-6 relative w-full">
          <div className="absolute w-full h-[1px] bg-[#273a50]"></div>

          <div className="flex space-x-4 z-10 px-4 bg-[#00214700]">
            <Link
              href={footer?.linkFacebook || "#"}
              className="w-10 h-10 bg-[#002147] border border-[#273a50] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-white" />
            </Link>
            <Link
              href={footer?.linkYoutube || "#"}
              className="w-10 h-10 bg-[#002147] border border-[#273a50] rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube className="text-white" />
            </Link>
            <Link
              href={footer?.linkzalo || "#"}
              className="w-10 h-10 bg-[#002147] border border-[#273a50] rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
              aria-label="Zalo"
            >
              <SiZalo className="text-3xl" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 py-4">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={footer?.logo02?.node?.mediaItemUrl || "/logo.png"}
                alt="Logo trường"
                width={310}
                height={310}
              />
            </Link>
          </div>
          <div className="text-center md:text-right text-gray-400 text-sm">
            {footer?.copyRight || "© Copyright Trường đại học Công Đoàn"}
          </div>
        </div>
      </div>
    </footer>
  );
};
