"use client";

import Image from "next/image";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
  isDecorative?: boolean;
}

export const Avatar = ({
  src,
  alt = "",
  size = 64,
  isDecorative = false
}: AvatarProps) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={isDecorative ? "" : alt}
        aria-hidden={isDecorative}
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
};
