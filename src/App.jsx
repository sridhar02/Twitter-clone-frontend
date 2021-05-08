import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from 'react-router-dom';

import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Tweets from './components/Tweets.jsx';
import Tweet from './components/Tweet';
import TimeLine from './components/TimeLine';

function NotFound() {
  return (
    <div>
      <h2>This route doesn't exist</h2>
    </div>
  );
}

function App() {
  let history = useHistory();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user'))
  );

  const handleSignout = () => {
    localStorage.removeItem('user');
    setUser('');
    // history.push('/');
  };

  return (
    <Router>
      <nav>
        <button onClick={handleSignout}>{user ? 'Logout' : 'Login'}</button>
      </nav>
      <Switch>
        <Route exact path="/">
          <div> Main route handler</div>
        </Route>
        <Route exact path="/login">
          <Login user={user} setUser={setUser} />
        </Route>
        <Route exact path="/signup">
          <Signup user={user} />
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
    </Router>
  );
}

export default App;
