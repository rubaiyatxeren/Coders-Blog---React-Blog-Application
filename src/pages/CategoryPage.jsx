import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Blogs from "../components/Blogs";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/").at(-1).replaceAll("%20", " ");

  return (
    <div>
      <Header />
      <div className="w-11/12 max-w-[900px] mx-auto py-6 mt-[70px] mb-[66px]">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back
          </button>
          <h2 className="text-3xl font-bold text-gray-800">
            Blogs on <span className="text-blue-600">{category}</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Explore all blog posts in this category
          </p>
        </div>
        <Blogs />
        <Pagination />
      </div>
    </div>
  );
};

export default CategoryPage;
