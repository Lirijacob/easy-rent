import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import NewGalleryPreview from "../components/NewGalleryPreview";
import ImageModal from "../components/ImageModal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Layout from "../components/Layout";

export default function ApartmentPage() {
  const { id } = useParams(); // get the apartment ID from the URL
  const [apartment, setApartment] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const navigate = useNavigate();

  // Check if a user is authenticated and load their favorites from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid)); // get the user document
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []); // store their favorites
        }
      }
    });
    return () => unsubscribe(); // clean up on unmount
  }, []);

  // Fetch apartment data from Firestore by ID
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const docRef = doc(db, "apartments", id);
        const docSnap = await getDoc(docRef); // get the apartment document

        if (docSnap.exists()) {
          setApartment({ id: docSnap.id, ...docSnap.data() }); // store it in state
        } else {
          console.log("Apartment not found.");
        }
      } catch (error) {
        console.error("Error loading apartment:", error);
      }
    };

    fetchApartment();
  }, [id]);

  // Add or remove apartment from user's favorites in Firestore
  const toggleFavorite = async () => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const isFavorite = favorites.includes(id);

    try {
      await updateDoc(userRef, {
        favorites: isFavorite ? arrayRemove(id) : arrayUnion(id), // update Firestore
      });
      setFavorites((prev) =>
        isFavorite ? prev.filter((pid) => pid !== id) : [...prev, id]
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Render checkmark or X icon for boolean features (e.g. has parking, elevator)
  const renderFeature = (label, value) => {
    if (value === undefined || value === null) {
      return <div><strong>{label}:</strong> Not specified</div>;
    }
    return (
      <div>
        <strong>{label}:</strong>{" "}
        {value ? (
          <FaCheckCircle className="inline text-green-500" />
        ) : (
          <FaTimesCircle className="inline text-gray-400" />
        )}
      </div>
    );
  };

  if (!apartment) {
    return <div className="text-center p-8">Loading apartment details...</div>;
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">

        {/* Back button */}
        <div className="flex justify-end max-w-5xl mx-auto px-6 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-800 hover:text-blue-600 text-base font-semibold transition"
          >
            ← Back
          </button>
        </div>

        <div className="max-w-5xl mx-auto p-6">

          {/* Image gallery preview */}
          <NewGalleryPreview
            images={apartment.images || []}
            onImageClick={(index) => {
              setCurrentImageIndex(index);
              setIsModalOpen(true);
            }}
          />

          {/* Full screen image modal */}
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

          {/* Title and favorite heart */}
          <div className="flex items-center justify-between my-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {apartment.title || "Untitled apartment"}
            </h1>
            <button
              onClick={toggleFavorite}
              className="text-2xl text-red-500 hover:scale-110 transition"
              aria-label="Add to favorites"
            >
              {favorites.includes(apartment.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {/* Apartment details */}
          <div className="bg-gray-50 rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-sm">
            <div><strong>Address:</strong> {apartment.address || "Not specified"}</div>
            <div><strong>Neighborhood:</strong> {apartment.neighborhood || "Not specified"}</div>
            <div><strong>Price:</strong> {apartment.price ? `₪${apartment.price.toLocaleString()}` : "Not specified"}</div>
            <div><strong>Rooms:</strong> {apartment.rooms || "Not specified"}</div>
            <div><strong>Entry date:</strong> {apartment.available_from === "2025-01-01" ? "Immediate" : apartment.available_from || "Not specified"}</div>
            <div><strong>Floor:</strong> {apartment.floor === 0 ? "Ground" : apartment.floor || "Not specified"}</div>
            <div><strong>Size:</strong> {apartment.size ? `${apartment.size} sqm` : "Not specified"}</div>
            {renderFeature("Balcony", apartment.has_balcony)}
            {renderFeature("Safe Room", apartment.has_safe_room)}
            {renderFeature("Pets Allowed", apartment.pets_allowed)}
            {renderFeature("Parking", apartment.has_parking)}
            {renderFeature("Elevator", apartment.has_elevator)}
            {renderFeature("Broker", apartment.has_broker)}
          </div>

          {/* Facebook post link */}
          {apartment.facebook_url && (
            <div className="mt-6">
              <a
                href={apartment.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Facebook Post
              </a>
            </div>
          )}

          {/* Full post description */}
          <p className="text-gray-600 mt-10 leading-relaxed whitespace-pre-line">
            {(apartment.description || "No description available").replace(/\\n/g, '\n')}
          </p>
        </div>
      </div>
    </Layout>
  );
}
