import React from 'react';
import { useUserStore } from '../stores/userStore';

const UserSettings = () => {
  const { userName, isLoggedIn, setUserName, toggleLogin } = useUserStore();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <section>
      <h2>User Settings</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
        <button type="button" onClick={toggleLogin}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </form>
    </section>
  );
};

export default UserSettings;
