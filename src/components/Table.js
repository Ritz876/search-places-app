import React from "react";

const Table = ({ cities, loading }) => {
  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (cities.length === 0) {
    return <div className="no-results">No result found</div>;
  }

  return (
    <table className="city-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {cities.map((city, index) => (
          <tr key={city.id}>
            <td>{index + 1}</td>
            <td>{city.name}</td>
            <td>
              {city.country}{" "}
              <img
                src={`https://flagsapi.com/${city.countryCode}/flat/32.png`}
                alt={city.country}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
