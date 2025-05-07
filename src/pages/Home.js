import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Layout from "../components/Layout";
import ImageCarousel from "../components/ImageCarousel";

// 🏠 דירות לדוגמה עם תמונות -------למחוק!!!
const sampleApartments = [
  {
    title: "דירה מעוצבת במרכז תל אביב",
    description: "3 חדרים, 4,200 ₪, קרובה לים, עם מרפסת ושקטה.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "דירה מרווחת בצפון הישן",
    description: "4 חדרים, 5,200 ₪, עם מעלית, חניה ונוף.",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "דירת גג מיוחדת",
    description: "2 חדרים, 3,800 ₪, גג פרטי ונוף אורבני.",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* שורת חיפוש */}
        <section className="max-w-3xl mx-auto mt-0 mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            מצאו דירה להשכרה בתל אביב בקלות!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            חפשו, סננו ושמרו דירות שפורסמו בפייסבוק – ביעילות!
          </p>

          {/* Search bar styled like a button */}
          <div
            onClick={() => navigate("/search")}
            className="cursor-pointer bg-white hover:bg-gray-200 transition rounded-full shadow max-w-xl mx-auto px-6 py-3 flex items-center justify-center"
          >
            <span className="text-gray-800 font-medium ml-2">
              חפש את הדירה שלך
            </span>
            <FaSearch className="text-gray-500" />

          </div>
        </section>


        {/* new apartments*/}
        <section className="max-w-6xl mx-auto py-8 px-4">
          <h3 className="text-2xl font-semibold mb-5 text-black text-right">דירות חדשות:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleApartments.map((apartment, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col">
                <ImageCarousel imageUrls={apartment.images} />
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{apartment.title}</h4>
                  <p className="text-gray-600 mb-3">{apartment.description}</p>
                </div>
                <button className="mt-2 bg-brandBlue hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold">
                  לצפייה בפרטים
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}


export default Home;
