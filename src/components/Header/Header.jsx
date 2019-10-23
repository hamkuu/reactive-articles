import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import Logo from './Logo';
import NavTabs from './NavTabs';

import hasAuthenticatedContext from '../Account/AuthenticationContext';
import SignInOutButton from './SignInOutButton';

const useStyles = makeStyles(() => ({
  toolBarContainer: {
    justifyContent: 'space-between',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar position='static' color='default'>
        <Toolbar variant='dense' className={classes.toolBarContainer}>
          <Logo />
          <NavTabs />
          <hasAuthenticatedContext.Consumer>
            {({ isLoggedIn, setAppLogOutState }) => (
              <SignInOutButton
                isLoggedIn={isLoggedIn}
                setAppLogOutState={setAppLogOutState}
              />
            )}
          </hasAuthenticatedContext.Consumer>
        </Toolbar>
      </AppBar>
    </>
  );
}
