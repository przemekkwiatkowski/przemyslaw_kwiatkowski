import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { checkResponse, deleteData, url } from '../../../utils/api';
import { ROUTES } from '../../../app.constants';

const TableRow = ({ data:{ id, name, species, gender, homeworld }, updateData }) => {
  const [removeCharacterError, setRemoveCharacterError] = useState(false);
  const history = useHistory();

  const handleRemove = async () => {
    setRemoveCharacterError(false);

    try {
      const response = await deleteData(url.characters, id);
      checkResponse(response);
      updateData();
    } catch (error) {
      console.error(error);
      setRemoveCharacterError(true);
    }
  };

  const handleEdit = () => {
    history.push(`${ROUTES.editCharacter}/${id}`)
  };

  useEffect(() => {
    if (removeCharacterError) {
      alert(`Deleting failed.`)
    }
  }, [removeCharacterError]);

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
          <button type="button" className="btn btn-secondary" onClick={handleEdit}>
            <i className="fa fa-pencil" aria-hidden="true" />
            Edit
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
