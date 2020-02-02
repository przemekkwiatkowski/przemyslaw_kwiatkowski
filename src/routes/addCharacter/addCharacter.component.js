import React from 'react';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../components/pageTitle/pageTitle.component';
import CharacterForm from '../../components/characterForm/characterForm.component';
import { addData, url } from '../../utils/api';
import { ROUTES } from '../../app.constants';

export const AddCharacter = () => {
  const history = useHistory();

  const onSubmit = async data => {
    try {
      await addData(url.characters, data);
      history.push(ROUTES.home);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageTitle title={'Add Character'} />

      <div className="row">
        <div className="col-md-6">
          <CharacterForm onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default AddCharacter;
