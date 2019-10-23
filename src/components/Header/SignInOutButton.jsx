import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
  },
  routerLink: {
    marginLeft: 'auto',
    textDecoration: 'none',
  },
}));

export default function SignInOutButton(props) {
  const { isLoggedIn, setAppLogOutState } = props;
  const classes = useStyles();

  return (
    <>
      <RouterLink to={isLoggedIn ? '/' : '/login'} className={classes.routerLink}>
        <Button
          onClick={isLoggedIn ? setAppLogOutState : () => {}}
          variant="outlined"
          size="small"
          className={classes.button}
        >
          {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </Button>
      </RouterLink>
    </>
  );
}

SignInOutButton.propTypes = {
  isLoggedIn: PropTypes.bool,
  setAppLogOutState: PropTypes.func.isRequired,
};

SignInOutButton.defaultProps = {
  isLoggedIn: false,
};
