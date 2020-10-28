import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification)
    return ('');

  return (<div>Notification</div>);
};

export default Notification;
