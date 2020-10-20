import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as config from '../config.json';
import * as ownerReducer from '../reducers/owner';

const nullValue = 'PlaceholderThatShouldNotExist';

const StairInput = ({ stair, setStair, setApartment }) => {
  const stairs = Object.keys(config.apartments);
  const dispatch = useDispatch();

  const stairOptions = stairs.map((stairName, index) =>
    <option key={index}>{stairName}</option>
  );

  const handleChange = event => {
    const newStair = event.target.options[event.target.selectedIndex].text;
    setStair(event.target.options[event.target.selectedIndex].text);
    localStorage.setItem('stair', newStair);
    setApartment(nullValue);
    dispatch(ownerReducer.setOwner(null));
  };

  return (
    <select onChange={handleChange} value={stair}>
      <option disabled value={nullValue}>Stair</option>
      {stairOptions}
    </select>
  );
};

const ApartmentInput = ({ apartment, setApartment, stair }) => {
  const dispatch = useDispatch();
  const apartments = Array.isArray(config.apartments[stair]) ?
    config.apartments[stair] : [];

  useEffect(() => {
    const oldApartment = localStorage.getItem('apartment');
    if (oldApartment)
      setApartment(oldApartment);
  }, []);

  const apartmentOptions = apartments.map((apartmentName, index) =>
    <option key={index}>{apartmentName}</option>
  );

  const handleChange = event => {
    const newApartment = event.target.options[event.target.selectedIndex].text;
    setApartment(newApartment);
    localStorage.setItem('apartment', newApartment);
    dispatch(ownerReducer.setOwner(stair + config.ownerDelimiter + newApartment));
  };

  return (
    <select onChange={handleChange} value={apartment}>
      <option disabled value={nullValue}>Apartment</option>
      {apartmentOptions}
    </select>
  );
};

const Inputs = () => {
  const dispatch = useDispatch();
  const [stair, setStair] = useState(nullValue);
  const [apartment, setApartment] = useState(nullValue);

  useEffect(() => {
    const oldStair = localStorage.getItem('stair');
    const oldApartment = localStorage.getItem('apartment');
    if (oldStair)
      setStair(oldStair);
    if (oldApartment && oldStair) {
      setApartment(oldApartment)
      dispatch(ownerReducer.setOwner(oldStair + config.ownerDelimiter + oldApartment));
    }
  }, []);

  const submitHandler = event => {
    event.preventDefault();
  }

  return (
    <form onSubmit={submitHandler}>
      <StairInput
        stair={stair} setStair={setStair}
        setApartment={setApartment}
      />
      <ApartmentInput
        apartment={apartment} setApartment={setApartment}
        stair={stair}
      />
      <input type='submit' name='Submit' value='Submit' />
    </form>
  );
};

export default Inputs;
