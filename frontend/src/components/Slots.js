import React from 'react';
import * as config from '../config.json';

const Slot = ({time, state}) => {
  const style = {
    width: '10px',
    height: '10px',
    backgroundColor: 'blue'
  }
  return (
    <div style={style} />
  )
};

const SlotColumn = () => {};

const SlotDay = ({date}) => {
  const slotColumns = [];

  return (
    <div>
      {date.toLocaleString()}
    </div>

  );
};

const Slots = () => {
  const currentTime = new Date();
  // If no slots can be made for today, start display at tomorrow
  if (currentTime.getHours() > config.lastSlot) {
    currentTime.setDate(currentTime.getDate() + 1);
    currentTime.setHours(0,0,0,0);
  }
  
  // Construct array of dates as set in config.dayCount
  const dates = (() => {
    const ret = [];
    for (let i = 0; i < config.dayCount; ++i) {
      const newDate = new Date();
      newDate.setDate(currentTime.getDate() + i);
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
    <div>
      {slotDays}
    </div>
  );
};

export default Slots;
