import React, { useState } from 'react';
import { checkResponse, deleteData, url } from '../../../utils/api';

const TableRow = ({ data:{ id, name, species, gender, homeworld }, updateData }) => {
  const [removeError, setRemoveError] = useState(false);

  const handleRemove = async () => {
    setRemoveError(false);

    try {
      const response = await deleteData(url.characters, id);
      checkResponse(response);
      updateData();
    } catch (error) {
      console.error(error);
      setRemoveError(true);
    }
  };

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{species}</td>
      <td>{gender}</td>
      <td>{homeworld}</td>
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Actions"
        >
          <button type="button" className="btn btn-secondary">
            <i className="fa fa-pencil" aria-hidden="true" /> Edit
          </button>
          <button type="button" className="btn btn-danger" onClick={handleRemove}>
            <i className="fa fa-trash-o" aria-hidden="true" />
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
