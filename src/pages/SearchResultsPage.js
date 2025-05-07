// pages/SearchResultsPage.js
// import React from "react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";


//--------------למחוק כשנחבר 
const fakeResults = [
  {
    title: "הזדמנות לגור בדירה חלומית",
    description:
      "הזדמנות לגור בדירה חלומית בתל אביב! מיקום: רחוב בן שפרוט היוקרתי. גודל: 90 מ״ר + מרפסת. 2 חדרי שינה וסלון מרווח.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    price: 7500,
    address: "רחוב בן שפרוט היוקרתי",
    neighborhood: "פלורנטין",
    size: 90,
    rooms: 2,
    features: ["balcony"],
    available_from: "2025-01-01",
  },
  {
    title: "דירת בוטיק עם נוף לים",
    description:
      "3 חדרים, קומה גבוהה עם נוף פתוח לים. מרפסת שמש, מעלית, חניה בטאבו. קרובה לים ולשוק הפשפשים.",
    imageUrl: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80",
    price: 8200,
    address: "רחוב יהודה הימית",
    neighborhood: "יפו",
    size: 85,
    rooms: 3,
    features: ["balcony", "parking", "elevator"],
    available_from: "2024-12-01",
  },
  {
    title: "דירה עם שותפים בלב פלורנטין",
    description:
      "4 חדרים, מרוהטת, כוללת מזגן, אינטרנט וארנונה. מתאימה לצעירים. נוף אורבני, אזור חי ותוסס.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    price: 4700,
    address: "רחוב ויטל",
    neighborhood: "פלורנטין",
    size: 95,
    rooms: 4,
    features: ["balcony", "pets"],
    available_from: "2024-11-15",
  }
];

const filterResults = (results, filters) => {
  const featureMap = {
    "חיות מחמד": "pets",
    "מעלית": "elevator",
    "מרפסת": "balcony",
    "חניה": "parking",
    "תיווך": "broker",
    "ממד": "safe_room",
    "ממ\"ד": "safe_room"
  };

  return results.filter((apt) => {
    // שכונה
    if (filters.neighborhood && filters.neighborhood !== "" &&
        apt.neighborhood?.toLowerCase() !== filters.neighborhood.toLowerCase()) {
      return false;
    }

    // מחיר מקסימלי
    if (filters.priceMax && apt.price && apt.price > filters.priceMax) {
      return false;
    }

    // מספר חדרים
    if (filters.rooms && filters.rooms !== "" && apt.rooms !== filters.rooms) {
      return false;
    }

    // תאריך כניסה
    if (filters.entryDate && apt.available_from) {
      const userDate = new Date(filters.entryDate);
      const aptDate = new Date(apt.available_from);
      if (aptDate > userDate) return false;
    }

    // סוג מבנה
    if (filters.apartmentMode && filters.apartmentMode !== "") {
      if (
        filters.apartmentMode === "whole" && apt.property_type !== "apartment"
      ) return false;
      if (
        filters.apartmentMode === "shared" && apt.property_type !== "shared"
      ) return false;
    }

    // סוג פרסום
    if (filters.listingType && filters.listingType !== "") {
      if (filters.listingType === "broker" && apt.has_broker !== true) return false;
      if (filters.listingType === "no-broker" && apt.has_broker === true) return false;
    }

    // תכונות
    if (filters.features && filters.features.length > 0) {
      const mappedFeatures = filters.features.map(f => featureMap[f]);
      for (let f of mappedFeatures) {
        if (!apt.features?.includes(f)) return false;
      }
    }

    return true;
  });
};


const SearchResultsPage = () => {
  const location = useLocation();
  const { searchData } = location.state || {};
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(searchData);
  }, [searchData]);

  const fetchResults = async (filters) => {
    const filtered = filterResults(fakeResults, filters);
    setResults(filtered);
  };


  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-8">
        <h1 className="text-2xl font-bold mb-6 text-right">תוצאות החיפוש</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map((apartment, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow p-4">
                <img
                  src={apartment.imageUrl}
                  alt="תמונה של דירה"
                  className="rounded-xl w-full h-52 object-cover mb-3"
                />
                <h2 className="text-xl font-semibold mb-1 text-right">{apartment.title}</h2>
                <p className="text-right text-gray-600 text-sm mb-2">{apartment.description}</p>
                <p className="text-right text-blue-600 font-bold">{apartment.price.toLocaleString()} ₪</p>
              </div>
            ))
          ) : (
            <p className="text-right col-span-full text-gray-600">לא נמצאו תוצאות</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResultsPage;

// const SearchResultsPage = ({ results }) => {
//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-8">
//         <h1 className="text-2xl font-bold mb-6 text-right">תוצאות החיפוש</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {results && results.length > 0 ? (
//             results.map((apartment, idx) => (
//               <div key={idx} className="bg-white rounded-2xl shadow p-4">
//                 <img
//                   src={apartment.imageUrl || "https://via.placeholder.com/400x250"}
//                   alt="תמונה של דירה"
//                   className="rounded-xl w-full h-52 object-cover mb-3"
//                 />
//                 <h2 className="text-xl font-semibold mb-1 text-right">{apartment.title}</h2>
//                 <p className="text-right text-gray-600 text-sm mb-2">{apartment.description}</p>
//                 <p className="text-right text-blue-600 font-bold">{apartment.price} ₪</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-right col-span-full text-gray-600">לא נמצאו תוצאות</p>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default SearchResultsPage;
