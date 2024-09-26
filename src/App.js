import React, { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import "./App.css";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchCities = async () => {
    if (!query) return;
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      headers: {
        "x-rapidapi-key": "8300ba030emsheb5ebb9abfa0f2cp1ed930jsn993b4e957ab0", // get your key from https://rapidapi.com/wirefreethought/api/geodb-cities
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setCities(response.data.data);
      setTotalResults(response.data.metadata.totalCount);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [query, limit, page]);

  return (
    <div className="app-container">
      <SearchBox setQuery={setQuery} />
      <Table cities={cities} loading={loading} />
      <Pagination
        totalResults={totalResults}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default App;
