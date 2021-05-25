import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import Login from './components/login';
import Tweet from './components/Tweet';
import Tweets from './components/Tweets';
import Signup from './components/signup';
import Profile from './components/Profile';
import TimeLine from './components/TimeLine';
import Followers from './components/Followers';
import Following from './components/Following';
import Follow from './components/Follow';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function Navbar({ user, setUser }) {
  const history = useHistory();

  const handleSignout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    history.push('/');
  };

  return (
    <nav>
      {user ? (
        <button type="button" onClick={handleSignout}>
          {user ? 'Logout' : 'Login'}
        </button>
      ) : null}
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const u = JSON.parse(localStorage.getItem('user'));
    if (u) {
      return u;
    }
  });

  if (user === undefined) {
    return (
      <>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </>
    );
  }

  return (
    <>
      <Navbar setUser={setUser} user={user} />
      <Switch>
        <Route path="/login">
          <Redirect to="/" />
        </Route>
        <Route path="/timeline/:username">
          <TimeLine user={user} />
        </Route>
        <Route path="/tweet/:id">
          <Tweet user={user} />
        </Route>
        <Route path="/tweets">
          <Tweets user={user} />
        </Route>
        <Route exact path="/:username/:followType">
          <Follow user={user} />
        </Route>
        {/* <Route exact path="/:username/following">
          <Following user={user} />
        </Route> */}
        <Route exact path="/:username">
          <Profile authUser={user} />
        </Route>
        <Route exact path="/">
          <Tweets user={user} />
        </Route>
        <Route>
          <Redirect to={`/timeline/${user.username}`} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
