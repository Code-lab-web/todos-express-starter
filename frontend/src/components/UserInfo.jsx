import React from 'react';
import { useUserStore } from '../stores/userStore';

const UserInfo = () => {
  const { userName, age, incrementAge } = useUserStore();

  return (
    <section>
      <h2>User Information</h2>
      <p>Username: {userName}</p>
      <p>Age: {age}</p>
      <button onClick={incrementAge}>Increment Age</button>
    </section>
  );
};

export default UserInfo;
