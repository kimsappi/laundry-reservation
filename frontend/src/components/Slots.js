import React from 'react';

import './Slots.css';
import * as config from '../config.json';

const Slot = ({time, state, currentDay}) => {
  const classList = ['slot'];
  if (currentDay)
    classList.push('slotDisabled');

  return (
    <div className={classList.join(' ')} />
  )
};

const SlotColumn = ({machine, currentDay}) => {
  const slots = (() => {
    const ret = [];
    for (let i = 0; i < config.lastSlot - config.firstSlot + 1; ++i) {
      const newSlot = <Slot currentDay={currentDay} />;
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
