"use client";

import Image from "next/image";

export const PartnerLogos = ({ data }: { data?: any }) => {
  return (
    <div className="w-full py-10 bg-white">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 md:justify-items-center scrollbar-hide gap-4 md:gap-8 pb-4 px-[calc((100%-2*calc(50%-8px))/2)] md:px-0">
          {data?.map((partner: any, index: number) => (
            <div
              key={index}
              className="w-[calc(50%-8px)] md:w-full h-32 md:h-40 flex-shrink-0 flex items-center justify-center"
            >
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  src={partner.image?.node?.mediaItemUrl || "/no-image.jpeg"}
                  alt={`Logo đối tác: ${partner.name || "đối tác"}`}
                  width={270}
                  height={150}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
