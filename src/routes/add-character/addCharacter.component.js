import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { url, getData, addData } from '../../utils/api';
import { ROUTES } from '../../app.constants';

export const AddCharacter = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Select species');
  const [gender, setGender] = useState('male');
  const [homeworld, setHomeworld] = useState('');
  const [nameError, setNameError] = useState(false);
  const [speciesError, setSpeciesError] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState(['Select species']);
  const [isSending, setIsSending] = useState(false);
  const [submittedWithErrors, setSubmittedWithErrors] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setNameError(!checkNameValidation());
    setSpeciesError(!checkSpeciesValidation());

    if (isSending) {
      return null;
    }

    if (isFormValidate()) {
      setIsSending(true);
      const newCharacter = {
        name: name.trim(),
        species: species,
        gender: gender,
        homeworld: homeworld.trim(),
      };
      try {
        await addData(url.characters, newCharacter);
        history.push(ROUTES.home);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSubmittedWithErrors(true);
    }
  };

  const handleNameInputChange = ({ target:{value} }) => setName(value);
  const handleSpeciesChange = ({ target:{value} })  => setSpecies(value);
  const handleGenderChange = ({ target:{value} }) => setGender(value);
  const handleHomeworldInputChange = ({ target:{value} }) => setHomeworld(value);

  const checkNameValidation = () => !!name.length;
  const checkSpeciesValidation = () => species !== 'Select species';

  const isFormValidate = () => checkNameValidation() && checkSpeciesValidation();

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
      setNameError(!checkNameValidation());
    }
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    if (formUpdated) {
      setSpeciesError(!checkSpeciesValidation());
    }
    // eslint-disable-next-line
  }, [species]);

  useEffect(() => {
    setFormUpdated(true);
  }, [name, species, gender, homeworld]);

  useEffect(() => {
    const getSpecies = async () => {
      try {
        const response = await getData(url.species);
        const data = await response.json();
        setSpeciesOptions(prevState => ([ ...prevState, ...data ]));
      } catch (error) {
        console.error(error);
      }
    };

    getSpecies();
  }, []);

  return (
    <>
      <h1>Add Character</h1>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={submitForm} noValidate>
            <div className="form-group">
              <label htmlFor="nameInput">
                Name
                <span className="text-primary"> *</span>
              </label>
              <input
                type="text"
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                id="nameInput" aria-describedby="nameInput"
                placeholder="Name"
                value={name}
                onChange={handleNameInputChange}
                required
              />
              <div className="invalid-feedback">
                This field is required.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="selectSpecies">
                Species
                <span className="text-primary"> *</span>
              </label>
              <select
                className={`form-control ${speciesError ? 'is-invalid' : ''}`}
                id="selectSpecies"
                defaultValue="Select species"
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
              <div className="invalid-feedback">
                This field is required.
              </div>
            </div>

            <fieldset className="form-group" onChange={handleGenderChange}>
              <div className="row">
                <legend className="col-form-label col-md-4">
                  Gender
                  <span className="text-primary"> *</span>
                </legend>
                <div className="col-md-8 mt-2 p-0">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="genderRadio" id="genderRadio1" value="male"
                           defaultChecked />
                    <label className="form-check-label" htmlFor="genderRadio1">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="genderRadio" id="genderRadio2" value="female" />
                    <label className="form-check-label" htmlFor="genderRadio2">
                      Female
                    </label>
                  </div>
                  <div className="form-check disabled">
                    <input className="form-check-input" type="radio" name="genderRadio" id="genderRadio3" value="n/a" />
                    <label className="form-check-label" htmlFor="genderRadio3">
                      n/a
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="form-group">
              <label htmlFor="nameInput">Homeworld</label>
              <input
                type="text"
                className="form-control"
                id="homeworldInput" aria-describedby="homeworldInput"
                placeholder="Homeworld"
                value={homeworld}
                onChange={handleHomeworldInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSending}>
              {isSending ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCharacter;
