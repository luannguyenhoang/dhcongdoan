import { TrackingSession } from "@/app/components/atoms/TrackingSession";
import { PhoneCTA } from "@/app/components/atoms/PhoneCTA";
import "@/app/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import { FixHead } from "@/app/components/atoms/FixHead";

const Header = dynamic(() =>
  import("@/app/components/molecules/Header").then((mod) => mod.Header)
);
const Footer = dynamic(() =>
  import("@/app/components/molecules/Footer").then((mod) => mod.Footer)
);
const PopupEvent = dynamic(() =>
  import("@/app/components/molecules/PopupEvent").then((mod) => mod.PopupEvent)
);

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID_DHCONGDOAN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="vi">
      <head>
        <meta
          name="google-site-verification"
          content="0I8ihcAAK1kYV1uBhtjUWwl7Z3x8xSaLmlaSIcc1b_c"
        />
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://noidung.dhcongdoan.vn" />
        <link rel="dns-prefetch" href="https://noidung.dhcongdoan.vn" />
        {/* Font Awesome with preload */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <FixHead />
        <div className="max-w-[1920px] mx-auto">
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          <TrackingSession />
          <PopupEvent />
          <Header />
          {children}
          <Footer />
          <PhoneCTA />
        </div>
      </body>
    </html>
  );
}
