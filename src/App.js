import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import LimitInput from "./components/LimitInput";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const API_HOST = "wft-geo-db.p.rapidapi.com";

function App() {
  //App File
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  console.log(totalItems);
  console.log(itemsPerPage);

  const fetchCities = useCallback(async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
        params: {
          namePrefix: searchTerm,
          limit: limit,
          offset: (currentPage - 1) * limit,
        },
      });
      setCities(response.data.data);
      setTotalItems(response.data.metadata.totalCount);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setLoading(false);
  }, [searchTerm, currentPage, limit]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCities();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchCities]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <SearchBox onSearch={handleSearch} />
      <Table cities={cities} loading={loading} searchTerm={searchTerm} />
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <LimitInput
          limit={limit}
          onLimitChange={handleLimitChange}
          onItemPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
}

export default App;
