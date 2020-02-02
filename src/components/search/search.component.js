import React from 'react';

const Search = ({ searchValue, setSearchValue }) => {
  const handleChange = (e) => setSearchValue(e.target.value);

  return (
    <div className="form-group">
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <input
        type="text"
        className="form-control"
        id="searchInput"
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
