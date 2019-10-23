import React from 'react';

const hasAuthenticatedContext = React.createContext({
  isLoggedIn: false,
  setAppLogInState: () => {},
  setAppLogOutState: () => {},
});

export { hasAuthenticatedContext as default };
