import React, { useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Debug = () => {
  const { posts, loading, error, page, totalPages } = useContext(AppContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <div className="fixed top-20 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <div className="space-y-1">
        <p>Path: {location.pathname}</p>
        <p>Page from URL: {searchParams.get("page") || "1"}</p>
        <p>Page state: {page}</p>
        <p>Total Pages: {totalPages}</p>
        <p>Posts count: {posts.length}</p>
        <p>Loading: {loading.toString()}</p>
        <p>Error: {error || "None"}</p>
      </div>
    </div>
  );
};

export default Debug;
