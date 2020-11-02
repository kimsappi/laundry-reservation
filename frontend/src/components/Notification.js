import React from 'react';
import { useSelector } from 'react-redux';

import './Notification.css';

const NotificationsContent = () => {
  const notifications = useSelector(state => state.notification);
  if (!notifications)
    return ('');

  return (
    notifications.map(notification => {
      const classList = ['notification'];
      classList.push(notification.success ? 'notificationSuccess' : 'notificationFailure');
      return <div className={classList.join(' ')}>{notification.data}</div>;
    })
  );
};

const Notification = () => {
  return (
    <div id='notificationsContainer'>
      <NotificationsContent />
    </div>
  );
}

export default Notification;
