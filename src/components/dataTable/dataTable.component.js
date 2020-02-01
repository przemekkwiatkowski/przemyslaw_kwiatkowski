import React from 'react';

import TableRow from './tableRow/tableRow.component';

const DataTable = ({ data, isLoading, isError }) => {
  const renderTableBody = () => {
    if (isError) {
      return (
        <tr>
          <td colSpan="6" className='text-center'>Something went wrong.<br/>Reload the page.</td>
        </tr>
      );
    }

    if (isLoading) {
      return (
        <tr>
          <td colSpan="6" className='text-center'>Loading...</td>
        </tr>
      );
    }

    return (
      data.map((item, index) => {
        return (
          <TableRow
            key={index}
            data={{...item}}
          />
        );
      })
    )
  };

  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-light">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Species</th>
        <th scope="col">Gender</th>
        <th scope="col">Homeworld</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
    </table>
  );
};

export default DataTable;
