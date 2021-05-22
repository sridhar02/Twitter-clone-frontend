import React, { useState } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import Login from './components/login';
import Signup from './components/signup';
import Tweets from './components/Tweets';
import Tweet from './components/Tweet';
import TimeLine from './components/TimeLine';
import Followers from './components/Followers';
import Following from './components/Following';

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
          <Redirect to={`/timeline/${user.username}`} />
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
        <Route path="/followers">
          <Followers user={user} />
        </Route>
        <Route path="/following">
          <Following user={user} />
        </Route>
        <Route path="/:username">
          <Tweets authUser={user} />
        </Route>
        <Route exact path="/">
          <Tweets />
        </Route>
        <Route>
          <Redirect to={`/timeline/${user.username}`} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
