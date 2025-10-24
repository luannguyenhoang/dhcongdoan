import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormPopup } from "./FormPopup";

const DesktopMenu = dynamic(() =>
  import("@/app/components/molecules/DesktopMenu").then(
    (mod) => mod.DesktopMenu
  )
);
const MobileMenu = dynamic(() =>
  import("@/app/components/molecules/MobileMenu").then((mod) => mod.MobileMenu)
);

export const HeaderMenu = ({ headerData }: { headerData: any }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  return (
    <>
      <div className="bg-white shadow-md sticky top-0 z-50 lg:px-0 px-2">
        <div className="mx-auto max-w-7xl h-full">
          <div className="flex justify-between items-center lg:gap-4 gap-1 h-24">
            <MobileMenu
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            <Link href="/" className="flex items-center mx-auto md:mx-0">
              <Image
                src={headerData?.logo?.node?.mediaItemUrl || "/logo.png"}
                alt="Logo Đại học Công Đoàn"
                width={300}
                height={300}
              />
            </Link>
            <div className="hidden md:block h-full">
              <DesktopMenu />
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#002147] px-2 py-1 text-xs md:px-10 md:py-2  font-bold text-white md:text-base hover:bg-[#fdc800] hover:text-[#002147] transition-all duration-300 whitespace-nowrap"
              >
                Đăng ký tư vấn
              </button>
            </div>
          </div>
          {mounted && showPopup && (
            <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
          )}
        </div>
      </div>
    </>
  );
};
