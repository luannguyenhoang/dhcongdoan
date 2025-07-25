"use client";

import { useState } from "react";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const AboutSection = ({ data }: { data: any }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-medium mb-6 text-[#002147]">
                {data?.title2 || "Hệ Đào tạo Từ xa Trường Đại Học Công Đoàn"}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {data?.description ||
                  "Trường Đại học Công Đoàn là một cơ sở giáo dục đại học công lập, trực thuộc Tổng Liên đoàn Lao động Việt Nam, với hơn 75 năm hình thành và phát triển. Là một trong những trường đại học đầu tiên gắn liền với phong trào công nhân và tổ chức Công đoàn Việt Nam, nhà trường luôn chú trọng đào tạo đội ngũ lao động có tri thức, bản lĩnh và đạo đức nghề nghiệp vững vàng. Với mục tiêu mở rộng cơ hội học tập cho mọi đối tượng, đặc biệt là người đang đi làm, Trường Đại học Công Đoàn triển khai chương trình Đại học từ xa theo hình thức đào tạo trực tuyến hiện đại, linh hoạt về thời gian, thuận tiện trong việc tiếp cận tri thức và nâng cao trình độ chuyên môn."}
              </p>

              <div className="space-y-3">
                {data?.feature?.map((feature: any, index: any) => (
                  <div key={index} className="flex items-start">
                    <FaCheckCircle
                      className="text-yellow-400 mt-1 mr-3 flex-shrink-0"
                      size={18}
                    />
                    <p className="text-gray-700 text-xl font-medium">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative overflow-hidden h-[400px]"
              style={{
                backgroundImage: `url(${
                  data?.imagevideo?.node?.mediaItemUrl || "/image12.png"
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
              role="img"
              aria-label="About Image"
            >
              <div className="group">
                <button
                  className=" duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[73px] h-[73px] rounded-full border-2 border-white  flex items-center justify-center transition-all group-hover:border-[#fdc800]"
                  onClick={openModal}
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <FaPlay
                      className="text-[#fdc800] group-hover:text-white ml-1 transition-all duration-300"
                      size={20}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black">
            <button
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              onClick={closeModal}
              aria-label="Đóng video"
            >
              <IoClose size={24} />
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${data?.idVideo}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute top-0 left-0 w-full h-full"
                title="About Us Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
