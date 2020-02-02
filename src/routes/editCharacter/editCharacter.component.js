import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PageTitle from '../../components/pageTitle/pageTitle.component';
import CharacterForm from '../../components/characterForm/characterForm.component';
import { editData, checkResponse, url } from '../../utils/api';
import { ROUTES } from '../../app.constants';

export const EditCharacter = () => {
  const history = useHistory();
  const [putError, setPutError] = useState(false);
  const { id } = useParams();

  const onSubmit = async data => {
    setPutError(false);

    try {
      const response = await editData(url.characters, id, data);
      checkResponse(response);
      history.push(ROUTES.home);
    } catch (error) {
      console.error(error);
      setPutError(true);
    }
  };

  const renderCharacterForm = () => {
    if (putError) {
      return <p>Editing new character failed. Reload the page and try again.</p>
    }

    return <CharacterForm onSubmit={onSubmit} id={id} />
  };

  return (
    <>
      <PageTitle title={'Edit Character'} />

      <div className="row">
        <div className="col-md-6">
          {renderCharacterForm()}
        </div>
      </div>
    </>
  );
};

export default EditCharacter;
