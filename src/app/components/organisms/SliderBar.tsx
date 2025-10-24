import dynamic from "next/dynamic";
import { useState } from "react";

const VideoMajorDetail = dynamic(() =>
  import("@/app/components/molecules/VideoMajorDetail").then(
    (mod) => mod.VideoMajorDetail
  )
);
const Register = dynamic(() =>
  import("@/app/components/molecules/Register").then((mod) => mod.Register)
);
const AllMajor = dynamic(() =>
  import("@/app/components/organisms/AllMajor").then((mod) => mod.AllMajor)
);
const Form = dynamic(() =>
  import("@/app/components/molecules/Form").then((mod) => mod.Form)
);
const NewPost = dynamic(() =>
  import("@/app/components/organisms/NewPost").then((mod) => mod.NewPost)
);
const SearchBar = dynamic(() =>
  import("@/app/components/atoms/SearchBar").then((mod) => mod.SearchBar)
);

export const SliderBar = ({
  showCustomSearch = false,
  showVideoMajorDetail = false,
  showAllMajor = false,
  showRegister = false,
  showForm = false,
  showNewPost = false,
  showSearchBar = false,
  isSticky = true,
  onSearch
}: {
  showSearch?: boolean;
  showCustomSearch?: boolean;
  showVideoMajorDetail?: boolean;
  showAllMajor?: boolean;
  showRegister?: boolean;
  showForm?: boolean;
  showNewPost?: boolean;
  showSearchBar?: boolean;
  isSticky?: boolean;
  onSearch?: (term: string) => void;
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`w-full mx-auto lg:px-0 ${isSticky ? "sticky top-28" : ""}`}
    >
      {showCustomSearch && (
        <div className="mb-8 border border-gray-200 py-7 px-5">
          <h2 className="text-[#002147] text-2xl font-medium mb-2">Tìm Kiếm</h2>
          <div className="border-b-4 border-yellow-400 w-12 mb-4"></div>
          <div className="flex flex-col gap-2">
            <input
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Tìm kiếm ..."
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
      )}
      {showSearchBar && <SearchBar placeholder="Tìm kiếm ..." />}
      {showVideoMajorDetail && <VideoMajorDetail />}
      {showRegister && <Register />}
      {showAllMajor && <AllMajor />}
      {showForm && <Form />}
      {showNewPost && <NewPost />}
    </div>
  );
};
