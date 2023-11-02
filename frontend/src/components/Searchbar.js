import React, { useState } from "react";

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex sticky w-full mx-auto">
      <input
        type="text"
        className="w-full  bg-white pl-2 text-base font-semibold outline-0 rounded-tl-lg rounded-bl-lg"
        placeholder="Username or Email"
        onClick={handleInputChange}
      />
      <input
        type="button"
        value="Search"
        className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
