"use client";
import Header from "@/app/components/molecules/Header";
import { getData } from "@/lib/getData";
import { GoogleTagManager } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GET_HEADER_AND_FOOTER } from "./api/graphQL/getHeaderAndFooter";
import "./globals.css";

const Footer = dynamic(() =>
  import("@/app/components/molecules/Footer").then((mod) => mod.Footer)
);

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerData, setHeaderData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
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
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        {gtmId && <GoogleTagManager gtmId={gtmId} />}

        <Header headerData={headerData?.pageBy?.trangChu?.header || {}} />
        {children}
        <Footer footerData={footerData?.pageBy?.trangChu?.footer || {}} />
      </body>
    </html>
  );
}
