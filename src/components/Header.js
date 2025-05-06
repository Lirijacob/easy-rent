import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/EasyRentLogo.jpg";
import { RxExit } from "react-icons/rx";


function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("שגיאה בהתנתקות:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b flex items-center justify-between px-5 py-2 shadow-sm">
      {/* Logo */}
      <Link to="/home">
        <img src={logo} alt="EasyRent" className="h-16" />
      </Link>

      {/* Navigation buttons */}
      <nav className="flex gap-3 items-center font-semibold">
        <Link
          to="/search"
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition flex items-center gap-1"
        >
          🔍 <span>חיפוש</span>
        </Link>
        <Link
          to="/favorites"
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition flex items-center gap-1"
        >
          ❤️ <span>דירות שאהבתי</span>
        </Link>
        <button
          onClick={handleLogout}
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition flex items-center gap-1"
        >
          <RxExit className="text-lg" /> 
          <span>התנתק</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
