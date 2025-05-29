"use client";

import HeaderMenu from "@/app/components/molecules/HeaderMenu";
import HeaderTop from "@/app/components/molecules/HeaderTop";
export default function Header({ headerData }: { headerData: any }) {
  return (
    <>
      <HeaderTop headerData={headerData} />
      <HeaderMenu headerData={headerData} />
    </>
  );
}
