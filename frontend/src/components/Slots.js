import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Slots.css';
import * as config from '../config.json';
import * as timeReducer from '../reducers/time';
import * as slotsReducer from '../reducers/slots';
import * as reservationsReducer from '../reducers/reservations';
import * as reservationService from '../services/reservations';

const Slot = ({time, currentDay, date, machine}) => {
  const classList = ['slot'];
  const currentTime = useSelector(state => state.time);
  const slots = useSelector(state => state.slots);
  const oldReservations = useSelector(state => state.reservations);
  const me = useSelector(state => state.owner);
  const dispatch = useDispatch();
  const slotStatuses = [...slots, ...oldReservations];

  const status = slotStatuses.filter(data => {
    const dateMatch = typeof data.date === 'string' ?
      data.date === date.toISOString().split('T')[0] :
      data.date.getDate() === date.getDate();

    return (
      data.machine === machine &&
      dateMatch &&
      data.time === time
    );
  });

  if (status.length) {
    console.log(status);
    const initialStatus = status[0].status;
    const statusText = initialStatus === 'reserved' && status[0].owner === me ?
      'myReserved' : initialStatus;
    classList.push('slot' + statusText.replace(/^./, statusText[0].toUpperCase()));
  }

  const disabled = currentDay && currentTime.time > time;
  if (disabled)
    classList.push('slotDisabled');
  
  const handleClick = event => {
    if (disabled)
      return;
    const oldStatus = status.length ?
      status[0].status : null;
    dispatch(slotsReducer.setStatusOnClick(date, time, machine, 'placeholderOwner', oldStatus));
  };

  return (
    <div className={classList.join(' ')} onClick={handleClick} />
  );
};

const SlotColumn = ({machine, currentDay, date}) => {
  const slots = (() => {
    const ret = [];
    for (let i = config.firstSlot; i < config.lastSlot + 1; ++i) {
      const newSlot =
        <Slot
          currentDay={currentDay}
          time={i}
          key={i}
          date={date}
          machine={machine.fullName}
        />;
      ret.push(newSlot);
    };
    return ret;
  })();

  return (
    <div className='flex column nowrap'>
      <div>
        {machine.shorthand}
      </div>
      <div className='flex column nowrap'>
        {slots}
      </div>
    </div>
  );
};

const SlotDay = ({date, currentDay}) => {
  const slotColumns = config.machines.map((machine, index) => 
    <SlotColumn
      machine={machine}
      key={index}
      currentDay={currentDay}
      date={date}
    />
  );

  return (
    <div className='flex column nowrap'>
      <div>
        {date.toLocaleString()}
      </div>
      <div className='flex row nowrap'>
        {slotColumns}
      </div>
    </div>
  );
};

const Slots = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentDatetime = useSelector(state => state.time);

  // const me = useSelector(state => state.owner);

  useEffect(() => {
    (async () => {
      const data = await reservationService.getReservations();
      if (data === null) {
        alert('There was an error connecting to the server.'); // TODO make nicer
        return;
      }
      dispatch(reservationsReducer.setOldReservations(data));
      setLoading(false);
    })();
  }, []);

  
  if (loading)
    return (<div>Loading</div>);

  // Constructing a date object from the string returned by the API, so we
  // can get construct the required number of days
  const currentDate = new Date(Date.parse(currentDatetime.date));

  // Construct array of dates as set in config.dayCount
  const dates = (() => {
    const ret = [];
    for (let i = 0; i < config.dayCount; ++i) {
      const newDate = new Date();
      newDate.setDate(currentDate.getDate() + i);
      newDate.setHours(0,0,0,0);
      ret.push(newDate);
    };
    return ret;
  })();

  const slotDays = dates.map((date, index) => 
    <SlotDay
      date={date}
      key={date}
      slots={null}
      currentDay={!index} // Used for nullifying past slots
    />
  );

  return (
    <div className='flex row nowrap'>
      {slotDays}
    </div>
  );
};

export default Slots;
