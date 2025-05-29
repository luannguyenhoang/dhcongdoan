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
        <div className="flex overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center scrollbar-hide gap-8 pb-4">
          {data?.map((partner: any, index: number) => (
            <div
              key={index}
              className="w-72 h-40 flex-shrink-0 md:flex-shrink flex items-center justify-center md:max-w-[calc(25%-24px)]"
            >
              <Image
                src={partner.image?.node?.mediaItemUrl || "/no-image.jpeg"}
                alt={`Logo đối tác: ${partner.name || "đối tác"}`}
                width={270}
                height={150}
                className="object-contain max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
