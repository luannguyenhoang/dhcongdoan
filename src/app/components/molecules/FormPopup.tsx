import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

const FormWrapper = dynamic(() =>
  import("@/app/components/molecules/FormWrapper").then(
    (mod) => mod.FormWrapper
  )
);

export const FormPopup = ({
  showPopup,
  setShowPopup
}: {
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
}) => {
  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[99999] overflow-hidden"
      style={{
        isolation: "isolate",
        paddingRight: "calc(100vw - 100%)"
      }}
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-white p-6 rounded-xl w-[430px] max-w-[90vw] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-transparent border-none text-xl cursor-pointer"
          onClick={() => setShowPopup(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 hover:text-gray-700"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="text-center mb-4">
          <div className="text-lg font-bold text-blue-700">🎓 ĐĂNG KÝ SỚM</div>
          <div className="text-orange-500 text-base font-semibold">
            NHẬN TÀI KHOẢN HỌC THỬ
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Đăng ký để nhận tư vấn miễn phí <br />
            <span className="text-xs text-gray-500">
              (Thông tin chương trình học, lịch khai giảng...)
            </span>
          </p>
        </div>
        <FormWrapper type="form-popup" />
        <p className="text-xs text-gray-500 text-center">
          * Chúng tôi cam kết bảo mật thông tin theo quy định của LDA
        </p>
      </div>
    </div>,
    document.body
  );
};
