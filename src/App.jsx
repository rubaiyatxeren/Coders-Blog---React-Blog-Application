import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import TagPage from "./pages/TagPage";

function App() {
  const { fetchBlogPosts } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") || 1;

    console.log("Current path:", location.pathname);
    console.log("Current page from URL:", page);

    if (location.pathname.includes("tags")) {
      const tag = decodeURIComponent(location.pathname.split("/").at(-1));
      console.log("Fetching tag:", tag, "page:", page);
      fetchBlogPosts(Number(page), tag);
    } else if (location.pathname.includes("categories")) {
      const category = decodeURIComponent(location.pathname.split("/").at(-1));
      console.log("Fetching category:", category, "page:", page);
      fetchBlogPosts(Number(page), null, category);
    } else if (location.pathname === "/") {
      console.log("Fetching home page:", page);
      fetchBlogPosts(Number(page));
    }
  }, [fetchBlogPosts, location.pathname, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:blogId" element={<BlogPage />} />
        <Route path="/tag/:tag" element={<TagPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
