// app/components/ui/carousel.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  alt: string;
}

export function Carousel({ images, alt }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const previous = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={previous}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden 
                ${currentIndex === index ? 'ring-2 ring-blue-500' : ''}`}
            >
              <Image
                src={image}
                alt={`${alt} - ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}