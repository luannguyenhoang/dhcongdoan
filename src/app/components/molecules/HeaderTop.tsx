import Link from "next/link";

export const HeaderTop = ({ headerData }: { headerData: any }) => {
  return (
    <div className="bg-[#002147] text-white py-3 px-4 lg:px-0">
      <div className="container mx-auto flex flex-wrap justify-center items-center max-w-6xl">
        <div className="flex items-center justify-end space-x-6 w-full">
          <Link href={headerData?.phone || "tel:0438573204"}>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[#fdc800]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="hover:text-[#fdc800] transition-all duration-300">
                {headerData?.titlephone || "(84-4) 3.857.3204"}
              </span>
            </div>
          </Link>
          <Link href={headerData?.email || "mailto:dhcongdoan@dhcd.edu.vn"}>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[#fdc800]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="hover:text-[#fdc800] transition-all duration-300">
                {headerData?.titleemail || "dhcongdoan@dhcd.edu.vn"}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
