"use client";

import { IoClose } from "react-icons/io5";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
}

export const VideoModal = ({
  isOpen,
  onClose,
  videoId,
  title
}: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <button
          className="absolute -top-10 right-0 z-[60] bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
          onClick={onClose}
          aria-label="Đóng video"
        >
          <IoClose size={24} />
        </button>
        <div className="relative pb-[56.25%] h-0 bg-black z-50">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-0 left-0 w-full h-full"
            title={title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
