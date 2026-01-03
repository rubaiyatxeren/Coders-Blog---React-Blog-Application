import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Pagination = () => {
  const { page, handlePageChange, totalPages } = useContext(AppContext);

  console.log("Pagination - Current Page:", page);
  console.log("Pagination - Total Pages:", totalPages);

  if (!totalPages || totalPages <= 1) {
    console.log("Pagination - Not rendering (totalPages:", totalPages, ")");
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] py-3 z-40 ">
      <div className="flex justify-center items-center gap-6">
        <div className="flex items-start gap-3">
          <button
            className={`px-3 py-1 rounded-md border font-medium transition-all ${
              page <= 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-blue-400 text-blue-600 hover:bg-blue-50 hover:border-blue-500"
            }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            ⪻ Previous
          </button>

          <span className="sm:hidden text-gray-700 font-medium">
            {page}/{totalPages}
          </span>

          <button
            className={`px-3 py-1 rounded-md border font-medium transition-all ${
              page >= totalPages
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
            }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next ⪼
          </button>
        </div>
        <div className="hidden sm:block text-gray-700 font-bold text-sm">
          🧭 Page{" "}
          <span className="font-bold  text-green-500 italic bg-black p-1.5 rounded-full">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-bold text-red-400 italic bg-black p-1.5 rounded-full">
            {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
