import React from 'react';
import { ROUTES } from '../../app.constants';
import { Link } from 'react-router-dom';

const Search = ({ searchValue, setSearchValue }) => {
  const handleChange = (e) => setSearchValue(e.target.value);

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
            value={searchValue}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-sm-6 text-sm-right">
          <Link to={ROUTES.addCharacter}>
            <button type="button" className="btn btn-primary mb-3">
              Add New
            </button>
          </Link>
      </div>
    </div>
  );
};

export default Search;
