import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import Card from "../components/Card";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { AppContext } from "../context/AppContext";

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading, posts } = useContext(AppContext);
  const blogId = location.pathname.split("/").at(-1);

  const fetchBlogPost = useCallback(async () => {
    if (!blogId) return;

    setLoading(true);

    console.log("Trying to fetch blog with ID:", blogId);

    const existingBlog = posts.find(
      (post) =>
        post.id === blogId ||
        post.id === parseInt(blogId) ||
        String(post.id) === String(blogId)
    );

    if (existingBlog) {
      console.log("Found blog in existing posts:", existingBlog);
      setBlog(existingBlog);

      const findRelatedBlogs = () => {
        if (!existingBlog.tags && !existingBlog.category) return [];

        const related = posts.filter((post) => {
          if (post.id === existingBlog.id) return false;

          if (existingBlog.tags && post.tags) {
            const commonTags = existingBlog.tags.filter((tag) =>
              post.tags.includes(tag)
            );
            if (commonTags.length > 0) return true;
          }

          if (
            existingBlog.category &&
            post.category === existingBlog.category
          ) {
            return true;
          }

          return false;
        });

        return related.slice(0, 3);
      };

      setRelatedBlogs(findRelatedBlogs());
      setLoading(false);
      return;
    }

    let url = `${BASE_URL}?blogId=${blogId}`;

    try {
      console.log("Fetching from API:", url);
      const response = await fetch(url);

      if (!response.ok) {
        url = `${BASE_URL}?id=${blogId}`;
        console.log("Trying alternative URL:", url);
        const altResponse = await fetch(url);

        if (!altResponse.ok) {
          throw new Error(`Blog not found (${response.status})`);
        }

        const data = await altResponse.json();
        console.log("API Response (alternative):", data);

        if (data.blog) {
          setBlog(data.blog);
        } else if (data.posts && data.posts.length > 0) {
          setBlog(data.posts[0]);
        } else if (data.id) {
          setBlog(data);
        } else {
          setBlog(data);
        }

        if (data.relatedBlogs) {
          setRelatedBlogs(data.relatedBlogs);
        } else if (data.related) {
          setRelatedBlogs(data.related);
        } else if (data.posts && data.posts.length > 1) {
          setRelatedBlogs(data.posts.slice(1));
        } else if (data.blogs) {
          setRelatedBlogs(data.blogs);
        } else {
          const currentBlog = data.blog || data.posts?.[0] || data;
          if (currentBlog && posts.length > 0) {
            const related = posts
              .filter((post) => {
                if (post.id === blogId) return false;

                if (currentBlog.tags && post.tags) {
                  const commonTags = currentBlog.tags.filter((tag) =>
                    post.tags.includes(tag)
                  );
                  if (commonTags.length > 0) return true;
                }

                if (
                  currentBlog.category &&
                  post.category === currentBlog.category
                ) {
                  return true;
                }

                return false;
              })
              .slice(0, 3);
            setRelatedBlogs(related);
          }
        }
      } else {
        const data = await response.json();
        console.log("API Response:", data);

        if (data.blog) {
          setBlog(data.blog);
        } else if (data.posts && data.posts.length > 0) {
          setBlog(data.posts[0]);
        } else if (data.id) {
          setBlog(data);
        } else {
          setBlog(data);
        }

        if (data.relatedBlogs) {
          setRelatedBlogs(data.relatedBlogs);
        } else if (data.related) {
          setRelatedBlogs(data.related);
        } else if (data.posts && data.posts.length > 1) {
          setRelatedBlogs(data.posts.slice(1));
        } else if (data.blogs) {
          setRelatedBlogs(data.blogs);
        } else {
          const currentBlog = data.blog || data.posts?.[0] || data;
          if (currentBlog && posts.length > 0) {
            const related = posts
              .filter((post) => {
                if (post.id === blogId || post.id === currentBlog.id)
                  return false;

                if (currentBlog.tags && post.tags) {
                  const commonTags = currentBlog.tags.filter((tag) =>
                    post.tags.includes(tag)
                  );
                  if (commonTags.length > 0) return true;
                }

                if (
                  currentBlog.category &&
                  post.category === currentBlog.category
                ) {
                  return true;
                }

                return false;
              })
              .slice(0, 3);
            setRelatedBlogs(related);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setBlog(null);
      setRelatedBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [blogId, setLoading, posts]);

  useEffect(() => {
    fetchBlogPost();
  }, [location.pathname, fetchBlogPost]);

  useEffect(() => {
    console.log("Blog data:", blog);
    console.log("Related blogs:", relatedBlogs);
    console.log("All posts:", posts);
  }, [blog, relatedBlogs, posts]);

  return (
    <div>
      <Header />
      <div className="w-11/12 max-w-[900px] mx-auto py-8 mt-[70px] mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-2"
        >
          <span>←</span> Back
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner label="Loading blog post..." />
          </div>
        ) : blog ? (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {blog.title || "Untitled Blog"}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <span className="font-medium">
                  By {blog.author || "Unknown Author"}
                </span>
                <span className="text-sm">
                  on {blog.date || "Unknown Date"}
                </span>
                {blog.category && (
                  <span
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 cursor-pointer"
                    onClick={() => navigate(`/categories/${blog.category}`)}
                  >
                    {blog.category}
                  </span>
                )}
              </div>
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {blog.content || "No content available."}
                </p>
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                      onClick={() => navigate(`/tag/${tag}`)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {relatedBlogs && relatedBlogs.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Related Blogs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog, index) => (
                    <div
                      key={relatedBlog.id || index}
                      className="cursor-pointer hover:scale-[1.02] transition-transform"
                      onClick={() => navigate(`/blogs/${relatedBlog.id}`)}
                    >
                      <Card post={relatedBlog} />
                    </div>
                  ))}
                </div>
              </div>
            ) : posts.length > 1 ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  More Blog Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts
                    .filter(
                      (post) =>
                        post.id !== blogId && (!blog || post.id !== blog.id)
                    )
                    .slice(0, 3)
                    .map((post, index) => (
                      <div
                        key={post.id || index}
                        className="cursor-pointer hover:scale-[1.02] transition-transform"
                        onClick={() => navigate(`/blogs/${post.id}`)}
                      >
                        <Card post={post} />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 italic">
                  No related blogs found. Check out other posts from the
                  homepage!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Blog Not Found
            </h2>
            <p className="text-gray-500 mb-6">
              The blog post you're looking for doesn't exist or may have been
              removed. Blog ID: {blogId}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
