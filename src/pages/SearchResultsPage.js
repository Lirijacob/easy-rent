// pages/SearchResultsPage.js
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ApartmentCard from "../components/ApartmentCard"; // נשתמש בכרטיס דירה אחיד

const mapFeature = {
  "חיות מחמד": "pets_allowed",
  "מעלית": "has_elevator",
  "מרפסת": "has_balcony",
  "חניה": "has_parking",
  "תיווך": "has_broker",
  "ממד": "has_safe_room",
  "ממ\"ד": "has_safe_room"
};

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchData } = location.state || {};
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]); // אופציונלי: עבור הלב

  useEffect(() => {
    if (searchData) {
      fetchAndFilterApartments();
    }
  }, [searchData]);

  const fetchAndFilterApartments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "apartments"));
      const allApartments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const filtered = allApartments.filter((apt) => {
        // שכונה
        if (
          searchData.neighborhood &&
          apt.neighborhood?.toLowerCase() !== searchData.neighborhood.toLowerCase()
        ) return false;

        // מחיר
        if (searchData.priceMax && apt.price > searchData.priceMax) return false;

        // חדרים
        if (searchData.rooms && apt.rooms !== searchData.rooms) return false;

        // תאריך כניסה
        if (searchData.entryDate && apt.available_from) {
          const userDate = new Date(searchData.entryDate);
          const aptDate = new Date(apt.available_from);
          if (aptDate > userDate) return false;
        }

        // מבנה הדירה
        if (searchData.apartmentMode) {
          if (
            searchData.apartmentMode === "whole" && apt.property_type !== "apartment"
          ) return false;
          if (
            searchData.apartmentMode === "shared" && apt.property_type !== "shared"
          ) return false;
        }

        // תכונות
        if (searchData.features && searchData.features.length > 0) {
          for (let label of searchData.features) {
            const key = mapFeature[label];
            if (!apt[key]) return false;
          }
        }

        return true;
      });

      setResults(filtered);
    } catch (err) {
      console.error("שגיאה בטעינת הדירות:", err);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-8">
        <h1 className="text-2xl font-bold mb-6 text-right">תוצאות החיפוש</h1>

        {results.length === 0 ? (
          <p className="text-right text-gray-600">לא נמצאו דירות מתאימות.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                isFavorite={favorites.includes(apartment.id)}
                onToggleFavorite={() => {}} // אפשרות לפיתוח
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
