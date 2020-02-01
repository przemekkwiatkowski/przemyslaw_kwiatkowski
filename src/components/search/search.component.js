import React from 'react';

const Search = () => {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="form-group">
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <input
            type="text"
            className="form-control"
            id="searchInput"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="col-sm-6 text-sm-right">
        <button type="button" className="btn btn-primary mb-3">
          Add New
        </button>
      </div>
    </div>
  );
};

export default Search;
