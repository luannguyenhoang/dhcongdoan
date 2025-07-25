import { GET_LIEN_HE } from "@/app/api/graphQL/getLienHe";
import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_LIEN_HE, "pageBy");
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
