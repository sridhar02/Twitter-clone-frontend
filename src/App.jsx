import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Tweets from "./components/Tweets.jsx";
import Tweet from "./components/Tweet"


function NotFound() {
  return (
    <div>
      <h2>This route doesn't exist</h2>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div> Main route handler</div>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/tweet/:id">
          <Tweet />
        </Route>
        <Route exact path="/tweets/:username">
          <Tweets />
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
