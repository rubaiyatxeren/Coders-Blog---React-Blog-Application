import React from "react";

const Header = () => {
  return (
    <div className="w-full border-b border-gray-100 py-2 shadow-md fixed top-0 z-50 bg-white/95 backdrop-blur-sm">
      <header className="text-center">
        <h1 className="text-2xl font-bold uppercase text-gray-800 tracking-tight">
          <span className="text-blue-500">⚡</span> Coders Blogs{" "}
          <span className="text-blue-500">⚡</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tech Insights & Programming Wisdom
        </p>
      </header>
    </div>
  );
};

export default Header;
