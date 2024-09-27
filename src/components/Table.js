import React from "react";

function Table({ cities, loading, searchTerm }) {
  if (loading) {
    return <div class="spinner"></div>;
  }

  if (!searchTerm) {
    return <div>Start searching</div>;
  }

  if (cities.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <table>
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
                src={`https://flagsapi.com/${city.countryCode}/flat/16.png`}
                alt={`${city.country} flag`}
                style={{ verticalAlign: "middle" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
