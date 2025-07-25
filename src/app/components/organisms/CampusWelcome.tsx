import Button from "@/app/components/atoms/Button";
import { DEFAULT_WELCOME_DATA } from "@/data/DefaultData";
import Image from "next/image";
import Link from "next/link";

export const CampusWelcome = ({ data }: { data?: any }) => {
  const welcomeData = data || DEFAULT_WELCOME_DATA;

  return (
    <div className="w-full relative px-4">
      <Image
        src={welcomeData?.image?.node?.mediaItemUrl || "/image1.png"}
        className="hidden lg:block"
        alt="Hình ảnh khuôn viên trường đại học"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority
      />
      <div className="lg:absolute top-0 left-0 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="w-full md:w-2/4 bg-white/80 md:bg-transparent py-24 rounded-lg md:rounded-none">
            <h2 className="text-5xl font-bold text-[#002147] mb-4 md:mb-6">
              {welcomeData?.title1}
            </h2>
            <p className="mb-4 text-gray-700 font-medium">
              {welcomeData?.title2}
            </p>
            <p className="mb-6 text-gray-700">{welcomeData?.description}</p>
            <Link href={welcomeData?.link || "/gioi-thieu"}>
              <Button
                variant="yellow"
                aria-label={`Xem thêm về ${welcomeData?.title1 || "Trường đại học"}`}
              >
                XEM NGAY
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
