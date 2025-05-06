// SearchPage.js
import React, { useState } from "react";
//import axios from "axios";
import { FaDog, FaFileContract, FaSun, FaParking, FaMapMarkerAlt } from "react-icons/fa";
import { FaElevator } from "react-icons/fa6";
import Layout from "../components/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaHome, FaUsers, FaBullhorn, FaBan, FaCalendarAlt } from "react-icons/fa";
import Select from "react-select";



const SearchPage = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [priceMax, setPriceMax] = useState(12000);
  const [selectedRooms, setSelectedRooms] = useState("");
  const [entryDate, setEntryDate] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [apartmentMode, setApartmentMode] = useState("");
  const [listingType, setListingType] = useState("");


  const neighborhoods = [
    { value: "florentin", label: "פלורנטין" },
    { value: "neve_tzedek", label: "נוה צדק" },
    { value: "rothschild", label: "רוטשילד" },
    { value: "old_north", label: "הצפון הישן" },
    { value: "yad_eliayhu", label: "יד אליהו" },
    { value: "ramat_aviv", label: "רמת אביב" },
    { value: "hatikva", label: "התקווה" },
    // תוסיפי כמה שתרצי
  ];

  const roomOptions = [
    { value: 1, label: "1" },
    { value: 1.5, label: "1.5" },
    { value: 2, label: "2" },
    { value: 2.5, label: "2.5" },
    { value: 3, label: "3" },
    { value: 3.5, label: "3.5" },
    { value: 4, label: "4" },
    { value: 4.5, label: "4.5" },
    { value: 5, label: "5" },
  ];



  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const renderFeatureButton = (feature, icon) => (
    <button
      onClick={() => toggleFeature(feature)}
      className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-full transition ${selectedFeatures.includes(feature) ? "border-black text-black" : "border-gray-300 text-gray-500"
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

          {/* שכונה */}
          <div className="mb-4 text-right">
            <label className="block font-semibold mb-2">שכונה</label>
            <Select
              options={neighborhoods}
              value={neighborhoods.find((n) => n.value === selectedNeighborhood)}
              onChange={(option) => setSelectedNeighborhood(option.value)}
              placeholder="בחר שכונה"
              isClearable
              menuPlacement="auto"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: 150,           // הגובה המקסימלי של הרשימה
                  overflowY: "auto",        // מאפשר גלילה פנימית
                  direction: "rtl",
                  zIndex: 9999,             // חשוב כדי שהרשימה תופיע מעל אלמנטים אחרים
                }),
                control: (provided) => ({
                  ...provided,
                  direction: "rtl",
                  textAlign: "right"
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: "150px",
                  overflowY: "auto",
                }),
              }}
            />

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
            <Select
              options={roomOptions}
              value={roomOptions.find((opt) => opt.value === selectedRooms)}
              onChange={(option) => setSelectedRooms(option.value)}
              placeholder="בחר מספר חדרים"
              isClearable
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: 150,
                  overflowY: "auto",
                  direction: "rtl",
                  zIndex: 9999
                }),
                control: (provided) => ({
                  ...provided,
                  direction: "rtl",
                  textAlign: "right"
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: "150px",
                  overflowY: "auto",
                }),
              }}
            />
          </div>
          {/* תאריך כניסה */}
          <div className="mb-4 text-right">
            <label className="block font-semibold mb-2">תאריך כניסה</label>

            <div className="relative w-full">
              {/* אייקון לוח שנה – יופיע רק כשאין תאריך */}
              {!entryDate && (
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
              )}

              <DatePicker
                selected={entryDate}
                onChange={(date) => setEntryDate(date)}
                placeholderText="בחר תאריך"
                dateFormat="dd/MM/yyyy"
                isClearable
                className="w-full border border-gray-300 rounded px-10 py-2 text-right"
              />
            </div>
          </div>

          {/* מבנה הדירה */}
          <div className="mb-6 text-right">
            <label className="block font-semibold mb-3 text-lg">מבנה הדירה</label>
            <div className="flex justify-end gap-4 flex-row-reverse">
              {[
                { label: "שלמה", value: "whole", icon: <FaHome className="text-2xl" /> },
                { label: "דירה עם שותפים", value: "shared", icon: <FaUsers className="text-2xl" /> }
              ].map(({ label, value, icon }) => (
                <button
                  key={value}
                  onClick={() => setApartmentMode(value)}
                  className={`flex flex-col items-center justify-center w-32 h-24 px-4 py-3 rounded-xl border text-sm font-medium transition text-center
                    ${apartmentMode === value
                      ? "bg-blue-700 text-white border-blue-700"
                      : apartmentMode === ""
                        ? "bg-white text-gray-700 border-gray-200"
                        : "bg-white text-gray-500 border-gray-300 hover:border-gray-400"}
                  `}

                >
                  <div className="mb-2">{icon}</div>
                  <span className="leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* סוג הפרסום */}
          <div className="mb-6 text-right">
            <label className="block font-semibold mb-3 text-lg">סוג פרסום</label>
            <div className="flex justify-end gap-4 flex-row-reverse">
              {[
                { label: "תיווך", value: "broker", icon: <FaBullhorn className="text-2xl" /> },
                { label: "ללא תיווך", value: "no-broker", icon: <FaBan className="text-2xl" /> }
              ].map(({ label, value, icon }) => (
                <button
                  key={value}
                  onClick={() => setListingType(value)}
                  className={`flex flex-col items-center justify-center w-32 h-24 px-4 py-3 rounded-xl border text-sm font-medium transition text-center
                    ${listingType === value
                      ? "bg-blue-700 text-white border-blue-700"
                      : listingType === ""
                        ? "bg-white text-gray-700 border-gray-200"
                        : "bg-white text-gray-500 border-gray-300 hover:border-gray-400"}
                  `}
                >
                  <div className="mb-2">{icon}</div>
                  <span className="leading-tight">{label}</span>
                </button>
              ))}
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
