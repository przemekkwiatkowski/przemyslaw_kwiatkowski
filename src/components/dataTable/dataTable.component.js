import React from 'react';

const DataTable = () => {
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
      <tr>
        <th scope="row">1</th>
        <td>Luke Skywalker</td>
        <td>Human</td>
        <td>Male</td>
        <td>Tatooine</td>
        <td>
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Actions"
          >
            <button type="button" className="btn btn-secondary">
              <i className="fa fa-pencil" aria-hidden="true" /> Edit
            </button>
            <button type="button" className="btn btn-danger">
              <i className="fa fa-trash-o" aria-hidden="true" /> Remove
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>R2-D2</td>
        <td>Droid</td>
        <td>n/a</td>
        <td>Naboo</td>
        <td>
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Actions"
          >
            <button type="button" className="btn btn-secondary">
              <i className="fa fa-pencil" aria-hidden="true" /> Edit
            </button>
            <button type="button" className="btn btn-danger">
              <i className="fa fa-trash-o" aria-hidden="true" /> Remove
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  );
};

export default DataTable;
