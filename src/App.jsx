import React, { useState } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import Login from './components/login';
import Signup from './components/signup';
import Tweets from './components/Tweets';
import Tweet from './components/Tweet';
import TimeLine from './components/TimeLine';

function NotFound() {
  return (
    <div>
      <h2>This route doesn\'\t exist</h2>
    </div>
  );
}

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
        <Navbar setUser={setUser} user={user} />
        <Switch>
          <Route exact to="/signup">
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
        <Route exact path="/">
          <div> Main route handler</div>
        </Route>
        <Route exact path="/timeline/:username">
          <TimeLine user={user} />
        </Route>
        <Route exact path="/tweet/:id">
          <Tweet user={user} />
        </Route>
        <Route exact path="/tweets/:username">
          <Tweets user={user} />
        </Route>
        <Route path="/tweets">
          <Tweets />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
