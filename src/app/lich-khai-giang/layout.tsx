import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
import { GET_SEO_LICH_KHAI_GIANG } from "@/app/api/graphQL/getLichKhaiGiang";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_LICH_KHAI_GIANG, "pageBy");
  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow"
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
