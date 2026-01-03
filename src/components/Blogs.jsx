import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "./Card";
import Spinner from "./Spinner";

const Blogs = () => {
  const { posts, loading, error } = useContext(AppContext);

  return (
    <div className="py-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner label="Fetching blog posts..." />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Error Loading Posts
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No Posts Found
          </h3>
          <p className="text-gray-600">
            Try a different search or check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
