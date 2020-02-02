import React, { useEffect, useState } from 'react';

import { checkResponse, getData, url } from '../../utils/api';

export const CharacterForm = ({ onSubmit, id = null }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Select species');
  const [gender, setGender] = useState('male');
  const [homeworld, setHomeworld] = useState('');
  const [nameValidationError, setNameValidationError] = useState(false);
  const [speciesValidationError, setSpeciesValidationError] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState(['Select species']);
  const [isSending, setIsSending] = useState(false);
  const [submittedWithErrors, setSubmittedWithErrors] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [fetchDataError, setFetchDataError] = useState(false);
  const [isGettingSpecies, setIsGettingSpecies] = useState(false);
  const [isFillingData, setIsFillingData] = useState(false);

  const handleNameInputChange = ({ target:{value} }) => setName(value);
  const handleSpeciesChange = ({ target:{value} })  => setSpecies(value);
  const handleGenderChange = ({ target:{value} }) => setGender(value);
  const handleHomeworldInputChange = ({ target:{value} }) => setHomeworld(value);

  const checkNameValidation = () => !!name.length;
  const checkSpeciesValidation = () => species !== 'Select species';

  const isFormValidate = () => checkNameValidation() && checkSpeciesValidation();

  const submitForm = async (e) => {
    e.preventDefault();
    setNameValidationError(!checkNameValidation());
    setSpeciesValidationError(!checkSpeciesValidation());

    if (isSending) {
      return null;
    }

    if (isFormValidate()) {
      setIsSending(true);
      const character = {
        name: name.trim(),
        species: species,
        gender: gender,
        homeworld: homeworld.trim(),
      };
      onSubmit(character);
    } else {
      setSubmittedWithErrors(true);
    }
  };

  useEffect(() => {
    if (submittedWithErrors) {
      setIsSending(false);
      const invalidFields = document.getElementsByClassName('is-invalid');
      invalidFields[0].focus();
      setSubmittedWithErrors(false);
    }
  }, [submittedWithErrors]);

  useEffect(() => {
    if (formUpdated) {
      setNameValidationError(!checkNameValidation());
    }
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    if (formUpdated) {
      setSpeciesValidationError(!checkSpeciesValidation());
    }
    // eslint-disable-next-line
  }, [species]);

  useEffect(() => {
    setFormUpdated(true);
  }, [name, species, gender, homeworld]);

  useEffect(() => {
    setFetchDataError(false);
    setIsFillingData(false);
    setIsGettingSpecies(false);

    const getSpecies = async () => {
      setIsGettingSpecies(true);

      try {
        const response = await getData(url.species);
        checkResponse(response);
        const data = await response.json();
        setSpeciesOptions(prevState => ([ ...prevState, ...data ]));
      } catch (error) {
        console.error(error);
        setFetchDataError(true);
      }

      setIsGettingSpecies(false);
    };

    const fillCharacterData = async () => {
      setIsFillingData(true);

      try {
        const response = await getData(url.characters, id);
        checkResponse(response);
        const { name, species, gender, homeworld } = await response.json();
        setName(name);
        setSpecies(species);
        setGender(gender);
        setHomeworld(homeworld);
      } catch (error) {
        console.error(error);
        setFetchDataError(true);
      }

      setIsFillingData(false);
    };

    getSpecies();

    if (id) {
      fillCharacterData();
    }
  }, [id]);

  const renderErrorMessage = () => {
    return (
      <div className="invalid-feedback">
        This field is required.
      </div>
    );
  };

  const renderNameInput = () => {
    return (
      <div className="form-group">
        <label htmlFor="nameInput">
          Name
          <span className="text-primary"> *</span>
        </label>
        <input
          type="text"
          className={`form-control ${nameValidationError ? 'is-invalid' : ''}`}
          id="nameInput"
          aria-label="Character name input"
          placeholder="Name"
          value={name}
          onChange={handleNameInputChange}
          required
        />
        {renderErrorMessage()}
      </div>
    );
  };

  const renderSpeciesSelect = () => {
    return (
      <div className="form-group">
        <label htmlFor="selectSpecies">
          Species
          <span className="text-primary"> *</span>
        </label>
        <select
          className={`form-control ${speciesValidationError ? 'is-invalid' : ''}`}
          id="selectSpecies"
          value={species}
          onChange={handleSpeciesChange}
          required
        >
          {speciesOptions.map((option, index) => {
            return (
              <option
                key={index}
                value={option}
                disabled={!(!!index)}
              >
                {option}
              </option>
            );
          })}
        </select>
        {renderErrorMessage()}
      </div>
    );
  };

  const renderGenderRadios = () => {
    return (
      <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-md-4">
            Gender
            <span className="text-primary"> *</span>
          </legend>
          <div className="col-md-8 mt-2 p-0">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="genderRadio"
                id="genderRadio1"
                value="male"
                checked={gender === 'male'}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="genderRadio1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="genderRadio"
                id="genderRadio2"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="genderRadio2">
                Female
              </label>
            </div>
            <div className="form-check disabled">
              <input
                className="form-check-input"
                type="radio"
                name="genderRadio"
                id="genderRadio3"
                value="n/a"
                checked={gender === 'n/a'}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="genderRadio3">
                n/a
              </label>
            </div>
          </div>
        </div>
      </fieldset>
    );
  };

  const renderHomeworldInput = () => {
    return (
      <div className="form-group">
        <label htmlFor="nameInput">Homeworld</label>
        <input
          type="text"
          className="form-control"
          id="homeworldInput"
          aria-describedby="Character homeworld input"
          placeholder="Homeworld"
          value={homeworld}
          onChange={handleHomeworldInputChange}
        />
      </div>
    );
  };

  const renderSubmitButton = () => {
    return (
      <button type="submit" className="btn btn-primary" disabled={isSending}>
        {isSending ? 'Sending...' : 'Submit'}
      </button>
    );
  };

  const renderForm = () => {
    if (fetchDataError) {
      return <p>Something went wrong. Reload the page and try again.</p>
    }

    if (isFillingData || isGettingSpecies) {
      return <p>Loading...</p>
    }

    return (
      <form onSubmit={submitForm} noValidate>
        {renderNameInput()}
        {renderSpeciesSelect()}
        {renderGenderRadios()}
        {renderHomeworldInput()}
        {renderSubmitButton()}
      </form>
    );
  };

  return renderForm();
};

export default CharacterForm;
