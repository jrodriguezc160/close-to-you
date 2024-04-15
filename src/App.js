import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import "./index.css"
import { useState, useEffect } from 'react';

function App () {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
      const loggedUserId = localStorage.getItem('currentUser');
      setCurrentUser(loggedUserId)
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
      {loggedIn === false ? <Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} /> : <ProfilePage currentUser={currentUser} />}
    </>
  )
}

export default App;
