import React, { useState, useEffect } from "react";

const SearchBox = ({ setQuery }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setQuery(searchTerm);
    }
  };

  useEffect(() => {
    const focusSearchBox = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        document.getElementById("search-box").focus();
      }
    };
    window.addEventListener("keydown", focusSearchBox);
    return () => window.removeEventListener("keydown", focusSearchBox);
  }, []);

  return (
    <input
      id="search-box"
      className="search-box"
      type="text"
      placeholder="Search places..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleSearch}
    />
  );
};

export default SearchBox;
