import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as inputsReducer from '../reducers/inputs';
import * as config from '../config.json';

const StairInput = () => {
  const dispatch = useDispatch();
  const stairs = Object.keys(config.apartments);
  const nullValue = 'PlaceholderThatShouldNotExist'
  const [value, setValue] = useState(nullValue);

  useEffect(() => {
    const oldStair = dispatch(inputsReducer.getStair());
    if (oldStair)
      setValue(oldStair.data.stair);
  }, [dispatch]);

  const stairOptions = stairs.map((stairName, index) =>
    <option key={index}>{stairName}</option>
  );

  const handleChange = event => {
    dispatch(
      inputsReducer.setStair(
        event.target.options[event.target.selectedIndex].text
      )
    );
    setValue(event.target.options[event.target.selectedIndex].text);
    // Is this unholy?
  };

  return (
    <select onChange={handleChange} value={value}>
      <option disabled value={nullValue}>Stair</option>
      {stairOptions}
    </select>
  );
};

const Inputs = () => {
  const dispatch = useDispatch();

  const inputs = useSelector(state => state.inputs);

  return (
    <form>
      <StairInput/>
    </form>
  );
};

export default Inputs;
