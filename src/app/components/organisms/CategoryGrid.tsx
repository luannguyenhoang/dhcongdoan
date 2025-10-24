import { DEFAULT_CATEGORY_DATA } from "@/data/DefaultData";
import { toSlug } from "@/utils/toSlug";
import dynamic from "next/dynamic";
import Image from "next/image";

const CategoryCard = dynamic(() =>
  import("@/app/components/atoms/CategoryCard").then((mod) => mod.CategoryCard)
);

export const CategoryGrid = ({ data }: { data?: any }) => {
  const categoryData = data || DEFAULT_CATEGORY_DATA;

  if (!categoryData || !categoryData.industrygroups) {
    return null;
  }

  return (
    <div className="w-full py-20 relative min-h-[600px]">
      <Image
        src="/bg-ss3.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="relative  p-8 mb-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-[#044ea2] mb-2">
              CÁC NGÀNH ĐÀO TẠO
            </h1>
            <p className="text-2xl text-gray-700 font-medium">
              Trường Đại Học Công Đoàn tuyển sinh trên Toàn Quốc các ngành
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
          {categoryData.industrygroups.map((category: any, index: any) => (
            <CategoryCard
              key={index}
              title={category.industryname || "image"}
              image={category.image.node.mediaItemUrl || "/no-image.jpeg"}
              href={`/nganh-dao-tao/${toSlug(category.industryname)}` || "/"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
