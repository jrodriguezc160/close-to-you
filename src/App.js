import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import "./index.css"
import { useState } from 'react';

function App () {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn === false ? <Login setLoggedIn={setLoggedIn} /> : <ProfilePage />}
    </>
  )
}

export default App;
