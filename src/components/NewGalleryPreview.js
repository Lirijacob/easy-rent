// NewGalleryPreview.js
import React from "react";

export default function NewGalleryPreview({ images, onImageClick }) {
  const displayImages = images.slice(0, 5);
  const extraCount = images.length - 5;

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[400px]">
      {/* תמונה גדולה בצד שמאל */}
      <div className="row-span-2 col-span-2">
        <img
          src={images[0]}
          alt="main"
          onClick={() => onImageClick(0)}
          className="w-full h-full object-cover cursor-pointer rounded-xl"
        />
      </div>

      {/* 4 תמונות קטנות בצד ימין */}
      {displayImages.slice(1).map((img, index) => (
        <div key={index + 1} className="relative">
          <img
            src={img}
            alt={`thumb-${index + 1}`}
            onClick={() => onImageClick(index + 1)}
            className="w-full h-full object-cover cursor-pointer rounded-xl"
          />

          {/* תצוגת +N */}
          {index === 3 && extraCount > 0 && (
            <div
              onClick={() => onImageClick(index + 1)}
              className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xl font-semibold cursor-pointer rounded-xl"
            >
              +{extraCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
