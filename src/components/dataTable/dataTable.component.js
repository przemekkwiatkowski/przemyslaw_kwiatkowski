import React from 'react';

import TableRow from './tableRow/tableRow.component';

const DataTable = ({ data, isLoading, isError, updateData }) => {
  const renderAlternativeTableRow = text => {
    return (
      <tr>
        <td colSpan="6" className='text-center'>{text}</td>
      </tr>
    );
  };

  const renderTableBody = () => {
    if (isError) {
      return renderAlternativeTableRow('Something went wrong. Reload the page.');
    }

    if (isLoading) {
      return renderAlternativeTableRow('Loading...');

    }

    if (!data.length) {
      return renderAlternativeTableRow('No Results Found');
    }

    return (
      data.map((item, index) => {
        return (
          <TableRow
            key={index}
            data={{...item}}
            updateData={updateData}
          />
        );
      })
    )
  };

  const renderTableHeaders = () => {
    const headers = ['Id', 'Name', 'Species', 'Gender', 'Homeworld', 'Actions']

    return headers.map((header, index) => {
      return <th key={index} scope="col">{header}</th>;
    })
  };

  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-light">
      <tr>
        {renderTableHeaders()}
      </tr>
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
    </table>
  );
};

export default DataTable;
