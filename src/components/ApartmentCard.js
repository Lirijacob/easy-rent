import React from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

const ApartmentCard = ({ apartment }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === apartment.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative text-right">
      <img
        src={apartment.image}
        alt="apartment"
        className="w-full h-52 object-cover"
      />

      <button
        onClick={() => toggleFavorite(apartment)}
        className="absolute top-3 right-3 text-white text-lg"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-white drop-shadow" />
        )}
      </button>

      <div className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{apartment.location}</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FaStar className="text-yellow-500" />
            <span>{apartment.rating}</span>
          </div>
        </div>
        <div className="text-gray-600 text-sm">
          {apartment.rooms} חדרים
        </div>
        <div className="text-gray-600 text-sm">
          כניסה {apartment.entry}
        </div>
        <div className="text-black text-sm font-semibold">
          ₪{apartment.price.toLocaleString()} / לחודש
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
