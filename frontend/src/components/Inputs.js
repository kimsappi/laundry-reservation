import React, { useEffect, useState } from 'react';

import * as config from '../config.json';

const nullValue = 'PlaceholderThatShouldNotExist';

const StairInput = ({ stair, setStair, setApartment }) => {
  const stairs = Object.keys(config.apartments);

  useEffect(() => {
    const oldStair = localStorage.getItem('stair');
    if (oldStair)
      setStair(oldStair);
  }, []);

  const stairOptions = stairs.map((stairName, index) =>
    <option key={index}>{stairName}</option>
  );

  const handleChange = event => {
    const newStair = event.target.options[event.target.selectedIndex].text;
    setStair(event.target.options[event.target.selectedIndex].text);
    localStorage.setItem('stair', newStair);
    setApartment(nullValue);
  };

  return (
    <select onChange={handleChange} value={stair}>
      <option disabled value={nullValue}>Stair</option>
      {stairOptions}
    </select>
  );
};

const ApartmentInput = ({ apartment, setApartment, stair }) => {
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
    setApartment(event.target.options[event.target.selectedIndex].text);
    localStorage.setItem('apartment', newApartment);
  };

  return (
    <select onChange={handleChange} value={apartment}>
      <option disabled value={nullValue}>Apartment</option>
      {apartmentOptions}
    </select>
  );
};

const Inputs = () => {
  const [stair, setStair] = useState(nullValue);
  const [apartment, setApartment] = useState(nullValue);

  useEffect(() => {
    const oldApartment = localStorage.getItem('apartment');
    if (oldApartment)
      setApartment(oldApartment)
  }, []);

  return (
    <form>
      <StairInput
        stair={stair} setStair={setStair}
        setApartment={setApartment}
      />
      <ApartmentInput
        apartment={apartment} setApartment={setApartment}
        stair={stair}
      />
    </form>
  );
};

export default Inputs;
