import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Slots.css';
import * as config from '../config.json';
import * as timeReducer from '../reducers/time';
import * as slotsReducer from '../reducers/slots';

const Slot = ({time, currentDay, date, machine}) => {
  const classList = ['slot'];
  const currentTime = useSelector(state => state.time);
  const slotStatuses = useSelector(state => state.slots);
  const dispatch = useDispatch();

  const status = slotStatuses.filter(data => {
    return (
      data.machine === machine &&
      data.date.getDate() === date.getDate() &&
      data.time === time
    );
  });

  if (status.length)
    console.warn(status);

  const disabled = currentDay && currentTime.getHours() > time;
  if (disabled)
    classList.push('slotDisabled');
  
  const handleClick = event => {
    dispatch(slotsReducer.setStatusOnClick(date, time, machine, 'placeholderOwner'));
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

  const currentTime = new Date();
  // If no slots can be made for today, start display at tomorrow
  if (currentTime.getHours() > config.lastSlot) {
    currentTime.setDate(currentTime.getDate() + 1);
    currentTime.setHours(0,0,0,0);
  }

  dispatch(timeReducer.setCurrentTime(currentTime));
  
  // Construct array of dates as set in config.dayCount
  const dates = (() => {
    const ret = [];
    for (let i = 0; i < config.dayCount; ++i) {
      const newDate = new Date();
      newDate.setDate(currentTime.getDate() + i);
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
