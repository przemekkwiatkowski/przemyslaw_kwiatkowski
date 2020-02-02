import React from 'react';

import TableRow from './tableRow/tableRow.component';

const DataTable = ({ data, isLoading, isError, updateData }) => {
  const renderTableRow = text => {
    return (
      <tr style={{height: "100vh"}}>
        <td colSpan="6" className='text-center'>{text}</td>
      </tr>
    );
  };

  const renderTableBody = () => {
    if (isError) {
      return renderTableRow('Something went wrong. Reload the page.');
    }

    if (isLoading) {
      return renderTableRow('Loading...');

    }

    if (!data.length) {
      return renderTableRow('No Results Found');
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
