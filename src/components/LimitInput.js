import React, { useState } from "react";

function LimitInput({ limit, onLimitChange, onItemPerPage }) {
  const [inputValue, setInputValue] = useState(limit);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInputValue(value);
  };

  const handleBlur = () => {
    let newLimit = inputValue;
    if (isNaN(newLimit) || newLimit < 1) {
      newLimit = 1;
    } else if (newLimit > 10) {
      newLimit = 10;
      alert("Maximum limit is 10 items per page.");
    }
    setInputValue(newLimit);
    onLimitChange(newLimit);
    onItemPerPage(newLimit);
  };

  return (
    <div className="limit-input">
      <label htmlFor="limit-input">Items per page:</label>
      <input
        id="limit-input"
        type="number"
        min="1"
        max="10"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default LimitInput;
