import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Header from "../components/Header";

export default function ApartmentPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setApartment(data);

          if (data.images && Array.isArray(data.images)) {
            const storage = getStorage();
            const urls = await Promise.all(
              data.images.map(async (path) => {
                try {
                  const url = await getDownloadURL(ref(storage, path));
                  return url;
                } catch {
                  return null;
                }
              })
            );
            setImageUrls(urls.filter(Boolean));
          }
        } else {
          console.log("הדירה לא נמצאה");
        }
      } catch (error) {
        console.error("שגיאה בטעינת הדירה:", error);
      }
    };

    fetchApartment();
  }, [id]);

  const toggleFavorite = async () => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const isFavorite = favorites.includes(id);

    try {
      await updateDoc(userRef, {
        favorites: isFavorite ? arrayRemove(id) : arrayUnion(id),
      });
      setFavorites((prev) =>
        isFavorite ? prev.filter((pid) => pid !== id) : [...prev, id]
      );
    } catch (error) {
      console.error("שגיאה בעדכון מועדפים:", error);
    }
  };

  if (!apartment) {
    return <div className="text-center p-8">טוען מידע על הדירה...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="relative mb-4">
          {imageUrls.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {imageUrls.map((url, i) => (
                <img key={i} src={url} alt={`תמונה ${i + 1}`} className="rounded shadow object-cover" />
              ))}
            </div>
          ) : (
            <div className="bg-gray-200 h-48 rounded mb-4" />
          )}

          {/* כפתור לב על התמונה */}
          <div className="absolute top-2 left-2 z-10 text-red-500 text-2xl cursor-pointer">
            {favorites.includes(id) ? (
              <FaHeart onClick={toggleFavorite} />
            ) : (
              <FaRegHeart onClick={toggleFavorite} />
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-right">{apartment.title || "דירה ללא שם"}</h1>
        <p className="text-gray-700 text-right mb-4">{apartment.description || "אין תיאור זמין."}</p>

        {/* פרטי הדירה */}
        <div className="bg-white rounded-lg shadow p-4 space-y-2 text-right text-gray-800 text-sm">
          <p><strong>כתובת:</strong> {apartment.address || "לא צוין"}</p>
          <p><strong>שכונה:</strong> {apartment.neighborhood || "לא צוין"}</p>
          <p><strong>מחיר:</strong> {apartment.price ? `₪${apartment.price.toLocaleString()}` : "לא צוין"}</p>
          <p><strong>מספר חדרים:</strong> {apartment.rooms || "לא צוין"}</p>
          <p><strong>תאריך כניסה:</strong> {apartment.available_from || "לא צוין"}</p>
          <p><strong>קומה:</strong> {apartment.floor || "לא צוין"}</p>
          <p><strong>שטח:</strong> {apartment.size || "לא צוין"} מ"ר</p>

          {/* מאפיינים בוליאניים */}
          <p><strong>מרפסת:</strong> {apartment.has_balcony ? "✓" : "לא צוין"}</p>
          <p><strong>ממ״ד:</strong> {apartment.has_safe_room ? "✓" : "לא צוין"}</p>
          <p><strong>חיות מחמד:</strong> {apartment.pets_allowed ? "✓" : "לא צוין"}</p>
          <p><strong>חניה:</strong> {apartment.has_parking ? "✓" : "לא צוין"}</p>
          <p><strong>מעלית:</strong> {apartment.has_elevator ? "✓" : "לא צוין"}</p>
          <p><strong>מתווך:</strong> {apartment.has_broker ? "✓" : "לא צוין"}</p>
        </div>
      </div>
    </div>
  );
}
