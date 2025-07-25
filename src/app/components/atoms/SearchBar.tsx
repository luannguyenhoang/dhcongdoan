"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  defaultValue = ""
}: {
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      router.push(`?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-8 border border-gray-200 py-7 px-5">
      <h2 className="text-[#002147] text-2xl font-medium mb-2">Tìm Kiếm</h2>
      <div className="border-b-4 border-yellow-400 w-12 mb-4"></div>
      <div className="flex flex-col gap-2">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={placeholder || "Tìm kiếm ..."}
          className="w-full py-3 px-4 border border-gray-200 bg-gray-100 text-gray-600"
          aria-label="Nhập từ khóa tìm kiếm"
        />
        <button
          onClick={handleSearch}
          className="w-full py-3 px-4 bg-[#002147] text-white font-semibold uppercase"
          aria-label="Tìm kiếm"
        >
          TÌM KIẾM
        </button>
      </div>
    </div>
  );
};
