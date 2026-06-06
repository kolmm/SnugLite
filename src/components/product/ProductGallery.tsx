import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 lg:gap-6">
      <div className="flex flex-col gap-3 sticky top-24 self-start">
        {images.map((img, idx) => {
          const thumbClass = [
            'aspect-square overflow-hidden border transition-colors',
            idx === active ? 'border-ink' : 'border-bone hover:border-stone',
          ].join(' ');
          return (
            <button
              key={img}
              type="button"
              onClick={() => setActive(idx)}
              className={thumbClass}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={`/${normalizePath(img)}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
      <div className="bg-paper aspect-square overflow-hidden">
        <img
          src={`/${normalizePath(images[active])}`}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
