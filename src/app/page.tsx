import HomePage from "@/app/home/HomePage";
import { Metadata } from "next";
import { GET_TRANG_CHU } from "./api/graphQL/getTrangChu";
import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";

export const revalidate = 1;

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
export default function Home() {
  return <HomePage />;
}
