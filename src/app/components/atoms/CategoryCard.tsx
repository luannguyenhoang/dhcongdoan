import Image from "next/image";
import Link from "next/link";
import { CategoryCardProps } from "@/types/types";

export const CategoryCard = ({ title, image, href }: CategoryCardProps) => {
  return (
    <Link
      href={href || "#"}
      className="relative block overflow-hidden group h-[160px]"
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <Image
        src={image}
        alt={`Danh mục ${title}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute bottom-5 left-5 z-20 text-white">
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
    </Link>
  );
};
