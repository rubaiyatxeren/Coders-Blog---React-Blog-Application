import React from "react";

const Spinner = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      {label && <p className="text-gray-600 text-sm">{label}</p>}
    </div>
  );
};

export default Spinner;
