"use client";

import { useState } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  postTitle: string;
};

export function ImageGalleryWithLightbox({ images, postTitle }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#e5ddd4] bg-[#faf8f6] shadow-[0_16px_48px_rgba(26,26,26,0.06)] cursor-pointer hover:shadow-[0_20px_60px_rgba(26,26,26,0.12)] transition-shadow"
            onClick={() => setLightboxIndex(idx)}
          >
            <ContentImage
              src={img}
              alt={`${postTitle} image ${idx + 1}`}
              fill
              className="object-cover"
              intrinsicWidth={960}
              intrinsicHeight={1200}
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={images[lightboxIndex]}
              alt={`${postTitle} image ${lightboxIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  idx === lightboxIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(idx);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
