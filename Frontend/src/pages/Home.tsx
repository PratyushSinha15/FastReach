import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // New state for loading

  

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while waiting for auth state
  }

  return (
    <div>
      <h1>Welcome</h1>
      {userEmail ? <p>Hello, {userEmail}</p> : <p>No user is logged in</p>}
    </div>
  );
};

export default Home;
