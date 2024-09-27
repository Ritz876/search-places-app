import React, { useState, useEffect, useRef } from "react";

function SearchBox({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        searchInputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={searchInputRef}
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search cities..."
      />
      <span className="keyboard-shortcut">Ctrl + /</span>
    </form>
  );
}

export default SearchBox;
