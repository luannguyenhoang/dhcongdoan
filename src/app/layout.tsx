import { TrackingSession } from "@/app/components/atoms/TrackingSession";
import { PhoneCTA } from "@/app/components/atoms/PhoneCTA";
import "@/app/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import { FixHead } from "@/app/components/atoms/FixHead";

const Header = dynamic(() =>
  import("@/app/components/molecules/Header").then((mod) => mod.Header)
);
const Footer = dynamic(() =>
  import("@/app/components/molecules/Footer").then((mod) => mod.Footer)
);

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
        <FixHead />
        <div className="max-w-[1920px] mx-auto">
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          <TrackingSession />
          <Header />
          {children}
          <Footer />
          <PhoneCTA />
        </div>
      </body>
    </html>
  );
}
