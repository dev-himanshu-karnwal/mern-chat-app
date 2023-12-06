import React, { useState, useEffect, useRef } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchbarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target)
      ) {
        // Click occurred outside the search bar
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchbarRef]);

  const getSearchResult = async () => {
    const res = await fetch(`/api/v1/users?search=${query}`);
    const data = await res.json();
    setSuggestions(data.data.users);
    if (data.result > 0) setShowSuggestions(true);
    console.log(data);
  };

  const handleSearch = async () => {
    console.log(query);
    getSearchResult();
  };

  return (
    <div className="flex w-full mx-auto relative" ref={searchbarRef}>
      <input
        type="text"
        className="w-full bg-white pl-2 text-base font-semibold outline-0 rounded-tl-lg rounded-bl-lg"
        placeholder="Username or Email"
        onChange={(event) => setQuery(event.target.value)}
      />
      <input
        type="button"
        value="Search"
        className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:cursor-pointer hover:bg-blue-800 transition-colors"
        onClick={handleSearch}
      />
      {showSuggestions ? (
        <ul className="bg-slate-50 w-full rounded-lg absolute mt-12 mr-6">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              className="py-1 pl-4  hover:bg-slate-500 hover:text-white"
            >
              <div className="flex items-center">
                <img
                  src={suggestion.pic}
                  className="rounded-full h-12  bg-white cursor-pointer p-2"
                  alt=""
                />
                <p className="pl-4">{suggestion.name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Searchbar;
