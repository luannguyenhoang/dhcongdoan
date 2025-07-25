import { GET_GIOI_THIEU } from "@/app/api/graphQL/getGioiThieu";
import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_GIOI_THIEU, "pageBy");
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
