import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { menus } from "@/router/router";

export const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuBottom, setMenuBottom] = useState<number>(0);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (pathname && pathname.startsWith(path + "/"));
  };

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        setMenuBottom(rect.bottom);
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="lg:hidden ml-auto flex items-center">
        <button
          className="text-gray-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10"
            style={{ top: menuBottom ? `${menuBottom}px` : "10rem" }}
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            ref={menuRef}
            className="lg:hidden bg-white shadow-lg absolute left-0 right-0 top-24 z-20"
          >
            <nav className="">
              <ul className="space-y-0">
                {menus.map(
                  (item: {
                    path: string;
                    title: string;
                    childs?: { path: string; title: string }[];
                  }) => (
                    <li
                      key={item.title}
                      className="relative border-b border-gray-100"
                    >
                      {item.childs ? (
                        <div>
                          {item.title === "Ngành đào tạo" ? (
                            <div
                              className={`flex items-center justify-between cursor-pointer ${
                                isActive("/nganh-dao-tao") ? "bg-gray-50" : ""
                              }`}
                              onClick={() => toggleSubmenu(item.title)}
                            >
                              <Link
                                href="/nganh-dao-tao"
                                className="block py-3 px-4 text-gray-800 w-full hover:text-[#fdc800] font-medium flex-grow relative"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMobileMenuOpen(false);
                                }}
                              >
                                {item.title}
                                {isActive("/nganh-dao-tao") && (
                                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#fdc800]"></span>
                                )}
                              </Link>
                              <div className="p-3 text-gray-800 w-full flex justify-end">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                    openSubmenu === item.title
                                      ? "transform rotate-180"
                                      : ""
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`flex items-center justify-between cursor-pointer ${
                                item.childs.some((child) =>
                                  isActive(child.path)
                                )
                                  ? "bg-gray-50"
                                  : ""
                              }`}
                              onClick={() => toggleSubmenu(item.title)}
                            >
                              <div className="block py-3 px-4 text-gray-800 font-medium relative">
                                {item.title}
                                {item.childs.some((child) =>
                                  isActive(child.path)
                                ) && (
                                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#fdc800]"></span>
                                )}
                              </div>
                              <div className="p-3 text-gray-800">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                    openSubmenu === item.title
                                      ? "transform rotate-180"
                                      : ""
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                          {openSubmenu === item.title && (
                            <ul className="border-t border-gray-100 bg-gray-50">
                              {item.childs.map(
                                (child: { path: string; title: string }) => (
                                  <li
                                    key={child.title}
                                    className="border-b border-gray-100 last:border-b-0"
                                  >
                                    <Link
                                      href={child.path}
                                      className={`block py-3 px-8 hover:text-[#fdc800] ${
                                        isActive(child.path)
                                          ? "text-[#fdc800] bg-gray-100"
                                          : "text-gray-700"
                                      }`}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <Link
                            href={item.path}
                            className="block py-3 px-4 text-gray-800 hover:text-[#fdc800] font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                          {isActive(item.path) && (
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#fdc800]"></span>
                          )}
                        </div>
                      )}
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
