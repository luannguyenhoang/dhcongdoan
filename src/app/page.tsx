import { getSeoData } from "@/utils/getSeoData";
import HomePage from "@/app/home/HomePage";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { GET_TRANG_CHU } from "@/app/api/graphQL/getTrangChu";
import { Metadata } from "next";
export const revalidate = 0;

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
