import React from 'react';
import classNames from 'classnames';

const Pagination = ({ currentPage, setCurrentPage, lastPage }) => {
  const renderPageNumbers = () => {
    const pages = [];

    for(let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          key={i}
          className={classNames('page-item',  {
            active: i === currentPage,
          })}
        >
          <button type="button" className="page-link" onClick={() => goToPage(i)}>
            {i}
            <span className="sr-only">(current)</span>
          </button>
        </li>
      );
    }

    return <>{pages}</>;
  };

  const goToPreviousPage = () => setCurrentPage(currentPage - 1);
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPage = page => setCurrentPage(page);

  return (
    <nav aria-label="Data grid navigation">
      <ul className="pagination justify-content-end">
        <li
          className={classNames('page-item',  {
            disabled: currentPage === 1,
          })}
        >
          <button type="button" className="page-link" tabIndex="-1" onClick={goToPreviousPage}>
            Previous
          </button>
        </li>

        {renderPageNumbers()}

        <li
          className={classNames('page-item',  {
            disabled: currentPage === lastPage,
          })}
        >
          <button type="button" className="page-link" onClick={goToNextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
