// ApartmentPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import NewGalleryPreview from "../components/NewGalleryPreview";
import ImageModal from "../components/ImageModal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ApartmentPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

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
        const docRef = doc(db, "apartments", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApartment({ id: docSnap.id, ...docSnap.data() });
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

  const renderFeature = (label, value) => {
    if (value === undefined || value === null) {
      return <div><strong>{label}:</strong> לא צוין</div>;
    }
    return (
      <div>
        <strong>{label}:</strong>{" "}
        {value ? (
          <FaCheckCircle className="inline text-green-500" />
        ) : (
          <><FaTimesCircle className="inline text-gray-400" /> לא</>
        )}
      </div>
    );
  };

  if (!apartment) {
    return <div className="text-center p-8">טוען מידע על הדירה...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        {/* גלריית תמונות */}
        <NewGalleryPreview
          images={apartment.images || []}
          onImageClick={(index) => {
            console.log("נבחרה תמונה:", index);
            setCurrentImageIndex(index);
            setIsModalOpen(true);
          }}
        />

        {/* מודאל תמונה */}
        {isModalOpen && currentImageIndex !== null && (
          <ImageModal
            isOpen={isModalOpen}
            images={apartment.images}
            currentIndex={currentImageIndex}
            onClose={() => {
              setIsModalOpen(false);
              setCurrentImageIndex(null);
            }}
            onNext={() =>
              setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length)
            }
            onPrev={() =>
              setCurrentImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length)
            }
          />
        )}

        {/* כותרת */}
        <h1 className="text-3xl font-bold my-4 text-gray-900">{apartment.title || "דירה ללא שם"}</h1>

        {/* פרטים */}
        <div className="bg-gray-50 rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-sm">
          <div><strong>כתובת:</strong> {apartment.address || "לא צוין"}</div>
          <div><strong>שכונה:</strong> {apartment.neighborhood || "לא צוין"}</div>
          <div><strong>מחיר:</strong> {apartment.price ? `₪${apartment.price.toLocaleString()}` : "לא צוין"}</div>
          <div><strong>מספר חדרים:</strong> {apartment.rooms || "לא צוין"}</div>
          <div><strong>תאריך כניסה:</strong> {apartment.available_from || "לא צוין"}</div>
          <div><strong>קומה:</strong> {apartment.floor || "לא צוין"}</div>
          <div><strong>שטח:</strong> {apartment.size || "לא צוין"} מ"ר</div>
          {renderFeature("מרפסת", apartment.has_balcony)}
          {renderFeature("ממ\u201dד", apartment.has_safe_room)}
          {renderFeature("חיות מחמד", apartment.pets_allowed)}
          {renderFeature("חניה", apartment.has_parking)}
          {renderFeature("מעלית", apartment.has_elevator)}
          {renderFeature("מתווך", apartment.has_broker)}
        </div>

        {/* כפתור מעבר לפייסבוק */}
        {apartment.facebook_url && (
          <div className="mt-6">
            <a
              href={apartment.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              מעבר לפוסט בפייסבוק
            </a>
          </div>
        )}

        {/* תיאור */}
        <p className="text-gray-600 mt-10 leading-relaxed whitespace-pre-line">
          {(apartment.description || "אין תיאור זמין").replace(/\\n/g, '\n')}
        </p>
      </div>
    </div>
  );
}
