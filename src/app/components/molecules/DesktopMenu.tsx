import Link from "next/link";
import { usePathname } from "next/navigation";
import { menus } from "@/router/router";

export const DesktopMenu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (pathname && pathname.startsWith(path + "/"));
  };

  return (
    <nav className="hidden lg:flex z-50 h-full">
      <ul className="flex space-x-1 h-full">
        {menus.map(
          (item: {
            path: string;
            title: string;
            childs?: { path: string; title: string }[];
          }) => (
            <li
              key={item.title}
              className="relative group h-full flex items-center"
            >
              {item.childs ? (
                <div className="flex items-center h-full">
                  {item.title === "Ngành đào tạo" ? (
                    <Link
                      href="/nganh-dao-tao"
                      className="px-3 h-full text-gray-800 hover:text-[#fdc800] font-medium flex items-center cursor-pointer relative group"
                    >
                      {item.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
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
                      <span
                        className={`absolute bottom-0 left-1/2 h-1 bg-[#fdc800] transform -translate-x-1/2 transition-all duration-300 ${
                          isActive("/nganh-dao-tao")
                            ? "w-[calc(100%-10px)]"
                            : "w-0 group-hover:w-[calc(100%-10px)]"
                        }`}
                      ></span>
                    </Link>
                  ) : (
                    <span className="px-3 h-full text-gray-800 hover:text-[#fdc800] font-medium flex items-center cursor-pointer relative group">
                      {item.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
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
                      <span
                        className={`absolute bottom-0 left-1/2 h-1 bg-[#fdc800] transform -translate-x-1/2 transition-all duration-300 ${
                          item.childs.some((child) => isActive(child.path))
                            ? "w-[calc(100%-10px)]"
                            : "w-0 group-hover:w-[calc(100%-10px)]"
                        }`}
                      ></span>
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  className="px-3 h-full text-gray-800 hover:text-[#fdc800] font-medium flex items-center relative group"
                >
                  {item.title}
                  <span
                    className={`absolute bottom-0 left-1/2 h-1 bg-[#fdc800] transform -translate-x-1/2 transition-all duration-300 ${
                      isActive(item.path)
                        ? "w-[calc(100%-10px)]"
                        : "w-0 group-hover:w-[calc(100%-10px)]"
                    }`}
                  ></span>
                </Link>
              )}

              {item.childs && (
                <div className="absolute top-full left-0 bg-[#002147] shadow-lg w-56 z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ul>
                    {item.childs.map(
                      (child: { path: string; title: string }) => (
                        <li key={child.title}>
                          <Link
                            href={child.path}
                            className={`px-4 py-3 border-b border-[#1a3b61] hover:bg-[#1a3b61] block transition-colors duration-300 ${
                              isActive(child.path)
                                ? "text-[#fdc800] bg-[#1a3b61]"
                                : "text-white hover:text-[#fdc800]"
                            }`}
                          >
                            {child.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
