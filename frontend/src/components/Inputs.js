import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as config from '../config.json';
import * as notificationReducer from '../reducers/notification';
import * as ownerReducer from '../reducers/owner';
import { setOldReservations } from '../reducers/reservations';
import * as reservationsService from '../services/reservations';

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
  }, [setApartment]);

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
  const [cancelCode, setCancelCode] = useState('');

  const slotStatuses = useSelector(state => state.slots);
  const me = useSelector(state => state.owner);

  useEffect(() => {
    const oldStair = localStorage.getItem('stair');
    const oldApartment = localStorage.getItem('apartment');
    if (oldStair)
      setStair(oldStair);
    if (oldApartment && oldStair) {
      setApartment(oldApartment)
      dispatch(ownerReducer.setOwner(oldStair + config.ownerDelimiter + oldApartment));
    }
  }, [dispatch]);

  const textInputHandler = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const submitHandler = async event => {
    event.preventDefault();
    const newReservations = slotStatuses.filter(slot => slot.status === 'reserving');
    const cancelledReservations = slotStatuses.filter(slot => slot.status === 'dereserving');
    if (!(newReservations.length + cancelledReservations.length)) {
      dispatch(notificationReducer.setNotification('No slots selected.', false)); // TODO move to Bootstrap alert or something
      return;
    }
    try {
      const data = await reservationsService.submitReservations(newReservations, cancelledReservations, cancelCode, me);
      dispatch(setOldReservations(data));
    } catch(err) {
      console.error(err);
    }
  };

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
      <div>
        <label htmlFor='cancelCode'>Cancellation code: (=> type=password?)</label>
        <input type='text' name='cancelCode' value={cancelCode} onChange={event => textInputHandler(event, setCancelCode)} />
      </div>
      <input type='submit' name='Submit' value='Submit' />
    </form>
  );
};

export default Inputs;
