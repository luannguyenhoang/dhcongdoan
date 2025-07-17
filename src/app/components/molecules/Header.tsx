"use client";

import { GET_HEADER_AND_FOOTER } from "@/app/api/graphQL/getHeaderAndFooter";
import HeaderMenu from "@/app/components/molecules/HeaderMenu";
import HeaderTop from "@/app/components/molecules/HeaderTop";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
export default function Header() {
  const [headerData, setHeaderData] = useState<any>(null);

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

        setHeaderData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <HeaderTop headerData={headerData?.pageBy?.trangChu?.header} />
      <HeaderMenu headerData={headerData?.pageBy?.trangChu?.header} />
    </>
  );
}
