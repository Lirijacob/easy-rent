import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ImageCarousel from "./ImageCarousel";

export default function ApartmentCard({ apartment, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 relative flex flex-col">
      {/* כפתור לב בפינה שמאלית עליונה */}
      <div className="absolute top-3 left-3 z-10 text-red-500 text-xl cursor-pointer">
        {isFavorite ? (
          <FaHeart onClick={() => onToggleFavorite(apartment.id)} />
        ) : (
          <FaRegHeart onClick={() => onToggleFavorite(apartment.id)} />
        )}
      </div>

      {/* תמונות */}
      <ImageCarousel imageUrls={apartment.images || []} />

      {/* פרטים */}
      <h4 className="text-xl font-bold mb-1">{apartment.title || "ללא כותרת"}</h4>
      <p className="text-gray-600 text-sm mb-3">
        {apartment.description ? apartment.description.slice(0, 80) + "..." : "אין תיאור זמין."}
      </p>
      <p className="text-gray-500 text-sm">
        חדרים: {apartment.rooms ?? "לא צוין"} · 
        מחיר: {apartment.price != null ? `₪${apartment.price}` : "לא צוין"}
      </p>

      {/* כפתור לצפייה בדירה */}
      <button
        onClick={() => navigate(`/apartment/${apartment.id}`)}
        className="mt-3 bg-brandBlue hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold"
      >
        לצפייה בפרטים
      </button>
    </div>
  );
}
