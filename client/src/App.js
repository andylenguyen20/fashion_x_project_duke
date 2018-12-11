import React, { Component } from 'react';
import { hot } from "react-hot-loader"
import { Switch, Route } from "react-router-dom"
import HomePage from "./components/home-page/HomePage"
import Login from "./components/login/LogIn"
import Signup from "./components/signup/SignUp"
import Profile from "./components/profile/Profile"

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
