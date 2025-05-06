// FavoritesPage.js
import React from "react";
import { FaHeart } from "react-icons/fa";
import Layout from "../components/Layout";

const favorites = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    location: "פלורנטין",
    rating: 4.9,
    rooms: 3,
    entry: "כניסה מיידית",
    price: 6500,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80",
    location: "פלורנטין",
    rating: 4.9,
    rooms: 3,
    entry: "כניסה מיידית",
    price: 6500,
  },
];

const FavoritesPage = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48">
      <h1 className="text-2xl font-bold text-right mb-1">דירות שאהבתי <FaHeart className="inline text-red-500" /></h1>
      <p className="text-right text-sm text-gray-500 mb-6">
        {favorites.length} דירות שמורות במועדפים
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white shadow rounded-lg overflow-hidden relative"
          >
            <img
              src={fav.image}
              alt="apartment"
              className="w-full h-56 object-cover"
            />
            <button className="absolute top-2 left-2 bg-white rounded-full p-1 shadow">
              <FaHeart className="text-red-500" />
            </button>
            <div className="p-4 text-right">
              <div className="text-lg font-semibold">{fav.location}</div>
              <div className="text-sm text-gray-600">{fav.rooms} חדרים</div>
              <div className="text-sm text-gray-600">{fav.entry}</div>
              <div className="text-sm text-gray-800">
                <span className="font-bold">₪{fav.price.toLocaleString()}</span> / לחודש
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>

  );
};

export default FavoritesPage;
