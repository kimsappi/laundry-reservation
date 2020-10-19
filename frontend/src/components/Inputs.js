import React, { useEffect, useState } from 'react';

import * as config from '../config.json';

const StairInput = () => {
  const stairs = Object.keys(config.apartments);
  const nullValue = 'PlaceholderThatShouldNotExist'
  const [value, setValue] = useState(nullValue);

  useEffect(() => {
    const oldStair = localStorage.getItem('stair');
    if (oldStair)
      setValue(oldStair);
  }, []);

  const stairOptions = stairs.map((stairName, index) =>
    <option key={index}>{stairName}</option>
  );

  const handleChange = event => {
    const newStair = event.target.options[event.target.selectedIndex].text;
    setValue(event.target.options[event.target.selectedIndex].text);
    localStorage.setItem('stair', newStair);
  };

  return (
    <select onChange={handleChange} value={value}>
      <option disabled value={nullValue}>Stair</option>
      {stairOptions}
    </select>
  );
};

const Inputs = () => {
  return (
    <form>
      <StairInput/>
    </form>
  );
};

export default Inputs;
