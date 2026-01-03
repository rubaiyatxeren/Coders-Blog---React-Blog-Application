import React from "react";
import Blogs from "../components/Blogs";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-11/12 max-w-[900px] mx-auto py-6 mt-[70px] mb-[66px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Latest Blog Posts
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest programming insights and tech news
          </p>
        </div>
        <Blogs />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
