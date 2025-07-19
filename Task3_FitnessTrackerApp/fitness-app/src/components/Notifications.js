import React, { useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState('');

  const handleAddNotification = () => {
    if (newNotification.trim() !== '') {
      setNotifications([...notifications, newNotification]);
      setNewNotification('');
    }
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <div>
        <input
          type="text"
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          placeholder="New notification..."
        />
        <button onClick={handleAddNotification}>Add</button>
        <button onClick={handleClearNotifications}>Clear All</button>
      </div>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;