import { createContext, useCallback, useMemo, useState } from "react";
import { BASE_URL } from "../baseUrl";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const fetchBlogPosts = useCallback(
    async (page = 1, tag = null, category = null) => {
      setLoading(true);
      setError("");
      let url = `${BASE_URL}?page=${page}`;

      if (tag) {
        url += `&tag=${encodeURIComponent(tag)}`;
      }
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }

      console.log("Fetching from URL:", url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("API Response:", data);

        if (!data.posts || data.posts.length === 0) {
          setError("No posts found. Try a different search!");
          setPosts([]);
          setTotalPages(0);
        } else {
          setPage(data.page || 1);
          setPosts(data.posts || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setPage(1);
        setPosts([]);
        setTotalPages(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handlePageChange = useCallback(
    (newPage) => {
      setPage(newPage);

      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", newPage);

      window.history.pushState({}, "", `${path}?${searchParams.toString()}`);

      if (path.includes("tags")) {
        const tag = decodeURIComponent(path.split("/").at(-1));
        fetchBlogPosts(newPage, tag);
      } else if (path.includes("categories")) {
        const category = decodeURIComponent(path.split("/").at(-1));
        fetchBlogPosts(newPage, null, category);
      } else {
        fetchBlogPosts(newPage);
      }
    },
    [fetchBlogPosts]
  );

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      error,
      setError,
      posts,
      setPosts,
      page,
      setPage,
      totalPages,
      setTotalPages,
      fetchBlogPosts,
      handlePageChange,
    }),
    [loading, error, posts, page, totalPages, fetchBlogPosts, handlePageChange]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
