import React from 'react';

const Instructions = () =>
  <div className='notification notificationInstructions'>
    <strong>Instructions</strong>
    <div>
      Click on a slot, input your data and click submit. Legend:
    </div>
    <ul id='instructionsList'>
      <li><div className='gridItem slot' />Slot can be reserved</li>
      <li><div className='gridItem slot slotDisabled' />Slot has expired</li>
      <li><div className='gridItem slot slotReserving' />You are attempting to reserve this slot</li>
      <li><div className='gridItem slot slotMyReserved' />You have reserved this slot</li>
      <li><div className='gridItem slot slotReserved' />Someone else has reserved this slot</li>
      <li><div className='gridItem slot slotDereserving' />You have currently reserved this slot, pressing submit will cancel your reservation</li>
    </ul>
  </div>
;

export default Instructions;
