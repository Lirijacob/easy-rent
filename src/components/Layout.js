// components/Layout.js
import React from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="mt-16 px-4">{children}</main>
    </div>
  );
}
