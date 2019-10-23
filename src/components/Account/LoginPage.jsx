import React from 'react';

import hasAuthenticatedContext from './AuthenticationContext';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <React.Fragment>
      <hasAuthenticatedContext.Consumer>
        {({ isLoggedIn, setAppLogInState, setAppLogOutState }) => (
          <LoginForm
            isLoggedIn={isLoggedIn}
            setAppLogInState={setAppLogInState}
            setAppLogOutState={setAppLogOutState}
          />
        )}
      </hasAuthenticatedContext.Consumer>
    </React.Fragment>
  );
}
