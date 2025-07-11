import Header from "@/app/components/molecules/Header";
import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { GET_TRANG_CHU } from "./api/graphQL/getTrangChu";
import "./globals.css";
export const revalidate = 0;

const Footer = dynamic(() =>
  import("@/app/components/molecules/Footer").then((mod) => mod.Footer)
);
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_TRANG_CHU, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow"
  };
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="0I8ihcAAK1kYV1uBhtjUWwl7Z3x8xSaLmlaSIcc1b_c"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <div className="max-w-[1920px] mx-auto">
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
