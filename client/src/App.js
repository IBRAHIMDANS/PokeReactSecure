import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";
import { Pane, Heading, Button } from "evergreen-ui";
import jwt from "jsonwebtoken";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Error404 from "./pages/Error404";
import Profile from "./pages/Profile";


import "./App.css";

localStorage.setItem("TEST", "HELLO");

class App extends Component {
  state = {
    user: null,
    isConnected: false
  };

  handleUser = user => {
    this.setState({ user, isConnected: true });
  };

  // Si  le component il est monté comme autoload 
    componentDidMount() {
      if (localStorage.getItem('token')) {
        this.setState({
          isConnected: true
        });
        this.setState({
          user: jwt.decode(localStorage.getItem('token'))
        });
      }
  
    }

    handleUser = user => {
      this.setState({
        user,
        isConnected: true
      });
    };

    logout() {
      localStorage.removeItem('token');
      window.location.reload();
    }

  render() {
    const { user, isConnected } = this.state;

    return (
    <Router>
        <>
          <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
            <Pane flex={1} alignItems="center" display="flex">
              <Link to="/" className="App-menu">
                <Heading size={600}>PokeReactSecure</Heading>
              </Link>
            </Pane>
            {!isConnected && (
              <>
                <Link to="/sign-in" className="App-menu">
                  <Button marginRight={16}>Login</Button>
                </Link>
                <Link to="/sign-up" className="App-menu">
                  <Button marginRight={16} appearance="primary">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            {isConnected && (
              <>
                <Link to="/dashboard" className="App-menu">
                  <Button marginRight={16}>Dashboard</Button>
                </Link>
                <Link to="/profile" className="App-menu">
                  <Button marginRight={16}>Profile</Button>
                </Link>
                <Button marginRight={16} appearance="primary" intent="danger" onClick={this.logout}>Logout</Button>
              </>
            )}
          </Pane>
          <Route exact path="/" component={Home} />
          <Route
            path="/sign-in"
            component={() => {
              return !isConnected ? (
                <SignIn connect={this.handleUser} />
              ) : (
                <Redirect to="/dashboard" />
              );
            }}
          />
          <Route
            path="/sign-up"
            component={() => {
              return !isConnected ? (
                <SignUp connect={this.handleUser} />
              ) : (
                <Redirect to="/dashboard" />
              );
            }}
          />
          {isConnected && (
            <>
              <Route
                path="/profile"
                component={() => <Profile nickname={user.nickname} />}
              />
              <Route
                path="/dashboard"
                component={() => <Dashboard nickname={user.nickname} />}
              />
            </>
          )}
        </>
      </Router>
    );
  }
}

export default App;

// 1. GERER LA PERSISTENCE DE DONNEES - 
//<Route component = { () => (<Route component={Error404} />)}
// A. ENREGISTRER LE TOKEN HANDLE USER
// B. RECUPERER QUAND REFRESH
// C. REMOVE TOKEN ON LOGOUT

// 2. CREER PAGE PROFILE USER + EDIT + REMOVE

// 3. CREER USER PROJECT(S) + EDIT + REMOVE
