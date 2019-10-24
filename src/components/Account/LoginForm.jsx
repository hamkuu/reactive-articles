import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginForm: {
    textTransform: 'none',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  loginWithGitHub: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    backgroundColor: 'black',
  },
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hasEmailInputError: false,
      hasPasswordInputError: false,
      hasBasicAuthError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      hasEmailInputError: false,
      hasBasicAuthError: false,
      email: event.target.value.trim().toLowerCase(),
    });
  }

  handlePasswordChange(event) {
    this.setState({
      hasPasswordInputError: false,
      hasBasicAuthError: false,
      password: event.target.value.trim(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const { setAppLogInState, setAppLogOutState } = this.props;

    if (email === '') {
      this.setState({
        hasEmailInputError: true,
      });
      return;
    }

    if (password === '') {
      this.setState({
        hasPasswordInputError: true,
      });
      return;
    }

    const authRequestUrl = `${process.env.REACT_APP_API_URL_BASE}/api/v1/user.new_auth_token`;
    const encodedBasicAuthString = Buffer.from(`${email}:${password}`).toString(
      'base64'
    );

    // request access token via Basic Authentication
    fetch(authRequestUrl, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Authorization: `Basic ${encodedBasicAuthString}`,
      }),
    })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          setAppLogInState(response.auth_token);
        } else {
          setAppLogOutState();
          this.setState({
            hasBasicAuthError: true,
            email: '',
            password: '',
          });
        }
      });
  }

  render() {
    const {
      email,
      password,
      hasEmailInputError,
      hasPasswordInputError,
      hasBasicAuthError,
    } = this.state;
    const { classes, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return (
        <React.Fragment>
          <Container maxWidth='xs'>
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <form
                className={classes.form}
                onSubmit={this.handleSubmit}
                noValidate
              >
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={email}
                  onChange={this.handleEmailChange}
                  error={hasEmailInputError || hasBasicAuthError}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={this.handlePasswordChange}
                  error={hasPasswordInputError || hasBasicAuthError}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Divider variant='middle' />
                <Button
                  href='/signup'
                  fullWidth
                  variant='contained'
                  className={classes.loginWithGitHub}
                >
                  Sign Up with Email
                </Button>
              </form>
            </div>
          </Container>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            message='Invalid Credential!'
            open={hasBasicAuthError}
          />
        </React.Fragment>
      );
    }
    return (
      <Switch>
        <Redirect to='/' />
      </Switch>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isLoggedIn: PropTypes.bool,
  setAppLogInState: PropTypes.func.isRequired,
  setAppLogOutState: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  isLoggedIn: false,
};

export default withStyles(styles)(LoginForm);
