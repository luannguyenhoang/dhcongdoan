import { CategoryCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export const CategoryCard = ({ title, image, href }: CategoryCardProps) => {
  return (
    <Link href={href || "#"} className="block rounded-xl  duration-300">
      <div className="relative w-full h-[230px] rounded-xl overflow-hidden border-[5px] border-[#3B82F6]">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`Danh mục ${title}`}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
      <div className="py-3">
        <h3 className="text-center font-bold text-2xl text-[#E53935]">
          {title}
        </h3>
      </div>
    </Link>
  );
};
