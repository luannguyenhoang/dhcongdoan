import { DesktopMenu } from "@/app/components/molecules/DesktopMenu";
import MobileMenu from "@/app/components/molecules/MobileMenu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeaderMenu({ headerData }: { headerData: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="bg-white shadow-md sticky top-0 z-50 lg:px-0 px-4">
      <div className="container mx-auto max-w-6xl h-full">
        <div className="flex justify-start items-center gap-10 h-24">
          <div className="flex items-center py-3">
            <Link href="/" className="flex items-center">
              <Image
                src={headerData?.logo?.node?.mediaItemUrl || "/logo.png"}
                alt="Logo Đại học Công Đoàn"
                width={300}
                height={300}
              />
            </Link>
          </div>

          <DesktopMenu />

          <MobileMenu
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </div>
    </div>
  );
}
