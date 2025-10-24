"use client";

import Image from "next/image";

interface CertificateSectionProps {
  data?: any;
}

export const CertificateSection = ({ data }: CertificateSectionProps) => {
  const degreeData = data?.degree;
  return (
    <div className="relative w-full py-16">
      <Image
        src="/bg-ss5.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Certificate Image */}
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={
                    degreeData?.images?.node?.mediaItemUrl || "/bang-cap.png"
                  }
                  alt="Mẫu văn bằng mới"
                  width={700}
                  height={700}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-[#ed3024] mb-4">
                  {degreeData?.title || "MẪU VĂN BẰNG MỚI"}
                </h2>
                <h3 className="text-3xl font-bold text-[#0087c3] mb-6">
                  {degreeData?.text ||
                    "TRÊN VĂN BẰNG ĐÃ KHÔNG CÒN GHI HÌNH THỨC ĐÀO TẠO"}
                </h3>
              </div>

              <div className="space-y-2 text-gray-700 text-lg">
                {degreeData?.description
                  ?.split("\r\n\r\n")
                  .map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  )) || (
                  <>
                    <p>
                      Thông tư 27/2019/TT-BGDĐT quy định về nội dung ghi trên
                      văn bằng và phụ lục văn bằng giáo dục đại học đã có hiệu
                      lực từ ngày 01/3/2020.
                    </p>

                    <p>
                      Theo quy định mới, trên văn bằng giáo dục đại học sẽ không
                      còn ghi hình thức đào tạo (chính quy, vừa làm vừa học, từ
                      xa, tự học có hướng dẫn).
                    </p>

                    <p>
                      Điều này có nghĩa là tất cả các hình thức đào tạo đều được
                      công nhận ngang nhau và có giá trị pháp lý như nhau, không
                      phân biệt hình thức học tập.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
