import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${post.id}`);
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    navigate(`/tag/${tag}`);
  };

  const handleCategoryClick = (e, category) => {
    e.stopPropagation();
    navigate(`/categories/${category}`);
  };

  return (
    <div
      className="border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer bg-white h-full flex flex-col"
      onClick={handleClick}
    >
      <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        By <span className="italic font-medium">{post.author}</span> on{" "}
        <span
          className="font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          onClick={(e) => handleCategoryClick(e, post.category)}
        >
          {post.category}
        </span>
      </p>
      <p className="text-xs text-gray-500 mb-4">Posted on {post.date}</p>
      <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed glow">
        {post.content}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags &&
          post.tags.map((tag, index) => (
            <span
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 cursor-pointer"
              key={index}
              onClick={(e) => handleTagClick(e, tag)}
            >
              #{tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Card;
