"use client";

import Image from "next/image";
import { FormWrapper } from "../molecules/FormWrapper";

export const Slider = ({
  data,
  loading = false
}: {
  data?: any;
  loading?: boolean;
}) => {
  const bannerData = data?.banner;
  return (
    <>
      <div className="relative w-full h-[1500px] lg:h-[803.250px]">
        <Image
          src={"/slider.jpg"}
          alt="slider"
          fill
          priority
          sizes="100vw"
          className="object-cover z-10"
        />
        <div className="max-w-7xl mx-auto lg:h-full z-30 absolute lg:bottom-0 top-0 left-0 right-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start ">
            {/* Left content */}
            <div className=" pt-11 px-3">
              {/* Title image */}
              <div className="relative w-full max-w-[600px]">
                <Image
                  src={
                    bannerData?.imageDaoTao?.node?.mediaItemUrl || "/title.png"
                  }
                  alt="Chương trình Đào tạo Đại học từ xa"
                  width={700}
                  height={300}
                  className="w-full h-auto z-10 relative"
                  priority
                />
                <div className="absolute top-0 right-0 w-full max-w-[150px]">
                  <Image
                    src="/sticker01.png"
                    alt="Chương trình Đào tạo Đại học từ xa"
                    width={300}
                    height={300}
                    className="w-full h-auto  z-0 relative"
                    priority
                  />
                </div>
                <div className="absolute -top-7 -left-2 w-full max-w-[80px]">
                  <Image
                    src="/hat.png"
                    alt="Chương trình Đào tạo Đại học từ xa"
                    width={300}
                    height={300}
                    className="w-full h-auto  z-0 relative"
                    priority
                  />
                </div>
                <div className="absolute top-6 right-1 left-20 mx-auto w-full max-w-[80px] flex justify-center items-center">
                  <Image
                    src="/gach-1.png"
                    alt="Chương trình Đào tạo Đại học từ xa"
                    width={300}
                    height={300}
                    className="w-full h-auto  z-0 relative"
                    priority
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="relative inline-block w-[95%] h-14 lg:h-11 -mt-3">
                <Image
                  src="/backgroundTextSlider.png"
                  alt="background"
                  fill
                  className="object-cover rounded"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[#0738a2] text-base lg:text-xl font-extrabold">
                    {bannerData?.title || "TRƯỜNG ĐẠI HỌC CÔNG ĐOÀN TUYỂN SINH"}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end items-end pr-12">
                <Image
                  src="/gach-2.png"
                  alt="Chương trình Đào tạo Đại học từ xa"
                  width={80}
                  height={80}
                  className="w-auto h-auto z-0 relative"
                  priority
                />
              </div>
              <p className="text-white text-base lg:text-xl font-medium flex justify-start ml-5 ">
                {bannerData?.text ||
                  "Đại học trực tuyến - Chủ động thời gian - Tiết kiệm chi phí"}
              </p>
              {/* Feature boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 pt-4 pl-5">
                {bannerData?.items?.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                      <Image
                        src={`/icon${index + 1}.png`}
                        alt={`icon${index + 1}`}
                        width={30}
                        height={30}
                        className="w-10 h-10 z-0 relative"
                        priority
                      />
                    </div>
                    <div className="text-white">
                      <p className="font-bold text-sm lg:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs lg:text-sm">{item.text}</p>
                    </div>
                  </div>
                )) || (
                  <>
                    {/* Fallback features */}
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                        <Image
                          src={"/icon1.png"}
                          alt="icon1"
                          width={30}
                          height={30}
                          className="w-full h-auto z-0 relative"
                          priority
                        />
                      </div>
                      <div className="text-white">
                        <p className="font-bold text-sm lg:text-base">
                          Không thi tuyển Chỉ
                        </p>
                        <p className="text-xs lg:text-sm">xét tuyển</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                        <Image
                          src={"/icon2.png"}
                          alt="icon2"
                          width={30}
                          height={30}
                          className="w-full h-auto z-0 relative"
                          priority
                        />
                      </div>
                      <div className="text-white">
                        <p className="font-bold text-sm lg:text-base">
                          Thăng tiến trong công việc
                        </p>
                        <p className="text-xs lg:text-sm">
                          mở rộng cơ hội việc làm
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                        <Image
                          src={"/icon3.png"}
                          alt="icon3"
                          width={30}
                          height={30}
                          className="w-full h-auto z-0 relative"
                          priority
                        />
                      </div>
                      <div className="text-white">
                        <p className="font-bold text-sm lg:text-base">
                          Học không cần
                        </p>
                        <p className="text-xs lg:text-sm">tới trường</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                        <Image
                          src={"/icon4.png"}
                          alt="icon4"
                          width={30}
                          height={30}
                          className="w-full h-auto z-0 relative"
                          priority
                        />
                      </div>
                      <div className="text-white">
                        <p className="font-bold text-sm lg:text-base">
                          Tiết kiệm thời gian
                        </p>
                        <p className="text-xs lg:text-sm">và chi phí</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Human image - Desktop: absolute, Mobile: in flow */}
            <div className="hidden lg:block w-full max-w-[450px] h-[550px] absolute left-[540px] bottom-32">
              <Image
                src={bannerData?.imageWomen?.node?.mediaItemUrl || "/human.png"}
                alt="Student"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>

            {/* Right content - Human image + Form stacked on mobile */}
            <div className="relative h-full flex flex-col lg:items-end lg:justify-end items-center pb-0 ">
              {/* Mobile human - visible in flow */}
              <div className="lg:hidden relative w-full max-w-[320px] h-[350px]">
                <Image
                  src={
                    bannerData?.imageWomen?.node?.mediaItemUrl || "/human.png"
                  }
                  alt="Student"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>

              {/* Form */}
              <div className="px-4 w-full">
                <div className=" w-full lg:absolute lg:top-12 lg:right-0 lg:max-w-[300px] bg-[#f1f3f4] rounded-2xl shadow-2xl p-6">
                  <div className="bg-gradient-to-r bg-[#073886] text-white text-center py-3 rounded-t-xl -mx-6 -mt-6 mb-5">
                    <h3 className="font-bold text-lg">ĐĂNG KÝ NGAY</h3>
                    <p className="text-xs mt-1">
                      Trước khi thời gian kết thúc hoặc
                    </p>
                    <p className="text-xs">Số lượng học viên đạt giới hạn</p>
                  </div>
                  <div className="lg:max-h-[362px] w-full overflow-auto">
                    <FormWrapper type="form-main" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[95%] lg:max-w-[1200px] lg:max-h-[334.531px] mx-auto rounded-[20px] lg:rounded-[35px] relative -mt-20 lg:-mt-32 bg-white z-30 shadow-[0_0_25px_rgba(0,0,0,0.65)] overflow-hidden">
        {/* Background images - hidden on mobile */}
        <Image
          src={"/img-line.png"}
          fill
          objectFit="cover"
          alt="img"
          className="rounded-[20px] lg:rounded-[35px] absolute z-0 top-0 hidden lg:block"
        />
        <Image
          src={bannerData?.imageFeature?.node?.mediaItemUrl || "/image-bg.png"}
          width={850}
          height={850}
          alt="img"
          className="rounded-[20px] lg:rounded-[35px] relative z-10 object-cover hidden lg:block"
        />

        {/* Mobile layout - stacked vertically */}
        <div className="lg:hidden flex flex-col">
          {/* Mobile image */}
          <div className="relative w-full h-[200px] rounded-t-[20px] overflow-hidden">
            <Image
              src={
                bannerData?.imageFeature?.node?.mediaItemUrl || "/image-bg.png"
              }
              fill
              alt="Hệ đào tạo từ xa"
              className="object-cover"
            />
          </div>

          {/* Mobile text */}
          <div className="p-6">
            <h2 className="text-[#1749ae] font-extrabold text-2xl mb-3 tracking-wide">
              {bannerData?.titleFeature || "HỆ ĐÀO TẠO TỪ XA"}
            </h2>
            <p className="text-[#333] text-sm leading-relaxed">
              {bannerData?.descriptionFeature ||
                "Đại học hệ đào tạo từ xa là hình thức học trong đó người học và người dạy không ở cùng một địa điểm. Người học có thể học mọi lúc, mọi nơi và vào bất kỳ thời gian nào, chỉ cần một chiếc máy tính có kết nối internet. Giảng viên sẽ giảng dạy thông qua nền tảng đào tạo e-learning"}
            </p>
          </div>
        </div>

        {/* Desktop layout - text overlay on image */}
        <div className="hidden lg:flex absolute bottom-0 top-0 right-0 p-8 max-w-[50%] rounded-3xl flex-col justify-center h-full">
          <div
            className="text-[#1749ae] font-extrabold text-4xl mb-2 tracking-wide"
            style={{ letterSpacing: "0.01em" }}
          >
            {bannerData?.titleFeature || "HỆ ĐÀO TẠO TỪ XA"}
          </div>
          <div className="text-[#333] text-lg leading-relaxed font-normal max-w-[92%]">
            {bannerData?.descriptionFeature ||
              "Đại học hệ đào tạo từ xa là hình thức học trong đó người học và người dạy không ở cùng một địa điểm. Người học có thể học mọi lúc, mọi nơi và vào bất kỳ thời gian nào, chỉ cần một chiếc máy tính có kết nối internet. Giảng viên sẽ giảng dạy thông qua nền tảng đào tạo e-learning"}
          </div>
        </div>
      </div>
      <div className="relative w-full lg:h-[836.391px] h-[1400px] -mt-52 px-4 pt-3">
        <Image
          src={"/slider-02.png"}
          alt="slider"
          fill
          priority
          sizes="100vw"
          className="object-cover z-10 "
        />
        <div className="lg:h-[75%] h-[30%] w-full max-w-[1200px] mx-auto z-20 absolute lg:bottom-0 top-0 left-0 right-0 px-4 pt-52">
          <div className="mt-8 relative">
            <Image
              src="/lo-icon.png"
              alt="icon"
              width={50}
              height={50}
              className="w-16 h-14 absolute top-14 right-7"
            />
            <div className="w-full flex justify-center">
              <Image
                src={
                  bannerData?.imageLoiThe?.node?.mediaItemUrl || "/loi-the.png"
                }
                alt="img"
                width={250}
                height={250}
                className="object-cover"
              />
            </div>
            <div className="w-full flex justify-center -mt-4">
              <div
                className="text-[#1749ae] font-extrabold lg:text-4xl text-3xl mb-2 tracking-wide"
                style={{ letterSpacing: "0.01em" }}
              >
                {bannerData?.titleLoiThe || "CỦA HỆ ĐÀO TẠO TỪ XA"}
              </div>
            </div>
          </div>
          <div className="z-20 absolute lg:-bottom-48 -bottom-72 left-0 right-0 grid grid-cols-1 lg:grid-cols-3 h-[65%] ">
            {/* Col 1 - Left side boxes */}
            <div className="col-span-1 flex flex-col gap-4 justify-center lg:px-0 px-4">
              {bannerData?.itemsLoiThe
                ?.slice(0, 2)
                .map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`rounded-3xl p-5 flex items-center gap-4 shadow-lg lg:h-[35%] h-[43%] ${
                      index === 0 ? "bg-[#145ca8]" : "bg-[#FFD54F]"
                    }`}
                  >
                    <div
                      className={`flex-1 ${index === 0 ? "text-white" : "text-black"}`}
                    >
                      <h2 className="font-bold text-[17px]">{item.title}</h2>
                      <p className="text-[16px] leading-relaxed">{item.text}</p>
                    </div>
                    <div
                      className={`rounded-full p-3 flex-shrink-0 w-16 h-16 flex items-center justify-center ${
                        index === 0
                          ? "bg-[#FFD54F]"
                          : "bg-white border border-[#1565C0]"
                      }`}
                    >
                      <Image
                        src={`/icon${index + 1}.png`}
                        alt="icon"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                )) || (
                <>
                  {/* Fallback Box 1 - Blue */}
                  <div className="bg-[#145ca8] rounded-3xl p-5 flex items-center gap-4 shadow-lg lg:h-[35%] h-[43%]">
                    <div className="text-white flex-1">
                      <h2 className="font-bold text-[17px]">
                        Không cần đến trường
                      </h2>
                      <p className="text-[16px] leading-relaxed">
                        Chỉ cần một thiết bị có kết nối mạng internet
                      </p>
                    </div>
                    <div className="bg-[#FFD54F] rounded-full p-3 flex-shrink-0 w-16 h-16 flex items-center justify-center">
                      <Image
                        src="/icon1.png"
                        alt="icon"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>

                  {/* Fallback Box 2 - Yellow */}
                  <div className="bg-[#FFD54F] rounded-3xl p-5 flex items-center gap-4 shadow-lg lg:h-[35%] h-[43%]">
                    <div className="text-black flex-1">
                      <h2 className="font-bold text-[17px]">
                        Không thi tuyển - Chỉ xét tuyển
                      </h2>
                      <p className="text-[16px] leading-relaxed">
                        Chỉ áp dụng tuyển sinh theo một hình thức duy nhất đó là
                        xét tuyển.
                      </p>
                    </div>
                    <div className="bg-white rounded-full p-3 flex-shrink-0 w-16 h-16 flex items-center justify-center border border-[#1565C0]">
                      <Image
                        src="/icon2.png"
                        alt="icon"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Col 2 - Center human image */}
            <div className="col-span-1 flex justify-center items-end relative">
              <Image
                src="/hat-2.png"
                alt="icon"
                width={50}
                height={50}
                className="w-16 h-16 absolute top-14 left-14"
              />
              <Image
                src="/electron.png"
                alt="icon"
                width={50}
                height={50}
                className="w-16 h-14 absolute top-14 right-7"
              />
              <Image
                src={"/human-02.png"}
                alt="img"
                width={340}
                height={340}
                className="object-cover"
              />
            </div>

            {/* Col 3 - Right side boxes */}
            <div className="col-span-1 flex flex-col gap-4 justify-center lg:px-0 px-4">
              {bannerData?.itemsLoiThe
                ?.slice(2, 4)
                .map((item: any, index: number) => (
                  <div
                    key={index + 2}
                    className={`rounded-3xl p-5 flex items-center gap-4 shadow-lg lg:h-[35%] h-[43%] ${
                      index === 0 ? "bg-[#FFD54F]" : "bg-[#145ca8]"
                    }`}
                  >
                    <div
                      className={`rounded-full p-3 flex-shrink-0 w-16 h-16 flex items-center justify-center ${
                        index === 0
                          ? "bg-white border border-[#1565C0]"
                          : "bg-[#FFD54F]"
                      }`}
                    >
                      <Image
                        src={`/icon${index + 3}.png`}
                        alt="icon"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                    <div
                      className={`flex-1 ${index === 0 ? "text-black" : "text-white"}`}
                    >
                      <h2 className="font-bold text-[17px]">{item.title}</h2>
                      <p className="text-[16px] leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                )) || (
                <>
                  {/* Fallback Box 3 - Yellow */}
                  <div className="bg-[#FFD54F] rounded-3xl p-5 flex items-center gap-4 shadow-lg lg:h-[35%] h-[43%]">
                    <div className="bg-white rounded-full p-3 flex-shrink-0 w-16 h-16 flex items-center justify-center border border-[#1565C0]">
                      <Image
                        src="/icon3.png"
                        alt="icon"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="text-black flex-1">
                      <h2 className="font-bold text-[17px]">
                        Cơ hội việc làm rộng mở
                      </h2>
                      <p className="text-[16px] leading-relaxed">
                        Nhân bằng giá trị giúp bạn thăng tiến trong công việc và
                        mở rộng cơ hội việc làm
                      </p>
                    </div>
                  </div>

                  {/* Fallback Box 4 - Blue */}
                  <div className="bg-[#145ca8] rounded-3xl p-5 flex items-center gap-4 shadow-lg lg:h-[35%] h-[43%]">
                    <div className="bg-[#FFD54F] rounded-full p-3 flex-shrink-0 w-16 h-16 flex items-center justify-center">
                      <Image
                        src="/icon4.png"
                        alt="icon"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="text-white flex-1">
                      <h2 className="font-bold text-[17px]">
                        Áp dụng công nghệ tiên tiến vào học tập
                      </h2>
                      <p className="text-[16px] leading-relaxed">
                        Sinh viên được cấp tài khoản riêng. Tương tác với Giảng
                        viên và các học viên khác hằng ngày qua forum.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
