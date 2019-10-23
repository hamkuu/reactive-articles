import React, { Suspense } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  saveIsLoggedInCookie,
  isLoggedInCookie,
  clearIsLoggedInCookie,
} from './helpers/universalCookie';

import AppErrorBoundary from './components/Common/AppErrorBoundary';
import hasAuthenticatedContext from './components/Account/AuthenticationContext';

import './App.css';

function AppLayout() {
  return (
    <>
      <main>
        <h1>react apps</h1>
      </main>
    </>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <AppLayout />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.setAppLogInState = () => {
      saveIsLoggedInCookie();
      this.setState({ isLoggedIn: true });
    };

    this.setAppLogOutState = () => {
      clearIsLoggedInCookie();
      this.setState({ isLoggedIn: false });
    };

    this.state = {
      isLoggedIn: isLoggedInCookie(),
      setAppLogInState: this.setAppLogInState,
      setAppLogOutState: this.setAppLogOutState,
    };
  }

  render() {
    const { isLoggedIn, setAppLogInState, setAppLogOutState } = this.state;

    return (
      <AppErrorBoundary>
        <hasAuthenticatedContext.Provider
          value={{
            isLoggedIn,
            setAppLogInState,
            setAppLogOutState,
          }}
        >
          <AppRouter />
        </hasAuthenticatedContext.Provider>
      </AppErrorBoundary>
    );
  }
}
