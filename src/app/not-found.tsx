import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-8xl font-bold text-[#002147]">404</h1>
        <div className="my-6 h-1 w-20 bg-[#fdc800] mx-auto"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Không tìm thấy trang
        </h2>
        <p className="text-gray-600 mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#001a38] text-white px-6 py-3 rounded-md transition-colors"
        >
          <FaHome />
          <span>Về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}
