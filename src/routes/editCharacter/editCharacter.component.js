import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../components/pageTitle/pageTitle.component';
import CharacterForm from '../../components/characterForm/characterForm.component';
import { addData, checkResponse, url } from '../../utils/api';
import { ROUTES } from '../../app.constants';

export const EditCharacter = () => {
  const history = useHistory();
  const [postError, setPostError] = useState(false);

  const onSubmit = async data => {
    setPostError(false);

    try {
      const response = await addData(url.characters, data);
      checkResponse(response);
      history.push(ROUTES.home);
    } catch (error) {
      console.error(error);
      setPostError(true);
    }
  };

  const renderCharacterForm = () => {
    if (postError) {
      return <p>Adding new character failed. Reload the page and try again.</p>
    }

    return <CharacterForm onSubmit={onSubmit} />
  };

  return (
    <>
      <PageTitle title={'Add Character'} />

      <div className="row">
        <div className="col-md-6">
          {renderCharacterForm()}
        </div>
      </div>
    </>
  );
};

export default EditCharacter;
