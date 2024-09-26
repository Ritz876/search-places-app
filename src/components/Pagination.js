import React from "react";

const Pagination = ({ totalResults, limit, page, setPage, setLimit }) => {
  const totalPages = Math.ceil(totalResults / limit);

  const handleLimitChange = (e) => {
    const value = Math.min(10, Math.max(1, e.target.value));
    setLimit(value);
  };

  return (
    <div className="pagination">
      <button onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
        Previous
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
        Next
      </button>
      <input
        type="number"
        min="1"
        max="10"
        value={limit}
        onChange={handleLimitChange}
      />
    </div>
  );
};

export default Pagination;
