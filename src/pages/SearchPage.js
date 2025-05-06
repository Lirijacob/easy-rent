// SearchPage.js
import React, { useState } from "react";
//import axios from "axios";
import { FaDog, FaFileContract, FaSun, FaParking, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaElevator } from "react-icons/fa6";
import Layout from "../components/Layout";

const SearchPage = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [priceMax, setPriceMax] = useState(12000);
  const [selectedRooms, setSelectedRooms] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const renderFeatureButton = (feature, icon) => (
    <button
      onClick={() => toggleFeature(feature)}
      className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-full transition ${
        selectedFeatures.includes(feature) ? "border-black text-black" : "border-gray-300 text-gray-500"
      }`}
    >
      {icon}
      {feature}
    </button>
  );

  /* const handleSubmit = async () => {
    const searchData = {
      type: selectedType,
      priceMax: priceMax,
      rooms: selectedRooms,
      entryDate,
      features: selectedFeatures,
    };

    try {
      const response = await axios.post("https://your-api-url.com/api/search", searchData);
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }; */

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48">
      <div className="max-w-3xl mx-auto font-sans">
        <h1 className="text-2xl font-bold mb-4 text-right">חיפוש</h1>

        {/* סוג הנכס */}
        <div className="mb-4 text-right">
          <label className="block font-semibold mb-2">סוג</label>
          <div className="flex gap-2 justify-end flex-row-reverse flex-wrap">
            {["all", "whole", "room"].map((value) => (
              <button
                key={value}
                onClick={() => setSelectedType(value)}
                className={`px-4 py-1 rounded-full border ${
                  selectedType === value ? "bg-black text-white" : "border-gray-300 text-gray-500"
                }`}
              >
                {value === "all" ? "כל סוג" : value === "whole" ? "דירה שלמה" : "חדר"}
              </button>
            ))}
          </div>
        </div>

        {/* טווח מחירים */}
        <div className="mb-4 text-right">
          <label className="block font-semibold mb-2">טווח מחירים</label>
          <div className="flex justify-end text-sm text-gray-600">
            <span>₪{priceMax.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="20000"
            step="100"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* מספר חדרים */}
        <div className="mb-4 text-right">
          <label className="block font-semibold mb-2">מספר חדרים</label>
          <select
            value={selectedRooms}
            onChange={(e) => setSelectedRooms(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">בחר מספר חדרים</option>
            {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* תאריך כניסה */}
        <div className="mb-4 text-right">
          <label className="block font-semibold mb-2">תאריך כניסה</label>
          <div className="relative">
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* שירותים נוספים */}
        <div className="mb-4 text-right">
          <label className="block font-semibold mb-2">מסנני חיפוש נוספים</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {renderFeatureButton("חיות מחמד", <FaDog />)}
            {renderFeatureButton("מעלית", <FaElevator />)}
            {renderFeatureButton("מרפסת", <FaSun />)}
            {renderFeatureButton("חניה", <FaParking />)}
            {renderFeatureButton("תיווך", <FaFileContract />)}
            {renderFeatureButton("ממ" + "ד", <FaMapMarkerAlt />)}
          </div>
        </div>

        <button
          //onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
        >
          הצג תוצאות
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default SearchPage;
