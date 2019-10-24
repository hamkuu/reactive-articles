import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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
  signupForm: {
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

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasRegistered: false,
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      hasUsernameInputError: false,
      hasEmailInputError: false,
      hasPasswordInputError: false,
      hasPasswordConfirmInputError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(
      this
    );
  }

  handleUsernameChange(event) {
    this.setState({
      hasUsernameInputError: false,
      username: event.target.value.trim(),
    });
  }

  handleEmailChange(event) {
    this.setState({
      hasEmailInputError: false,
      email: event.target.value.trim().toLowerCase(),
    });
  }

  handlePasswordChange(event) {
    this.setState({
      hasPasswordInputError: false,
      password: event.target.value.trim(),
    });
  }

  handlePasswordConfirmChange(event) {
    this.setState({
      hasPasswordConfirmInputError: false,
      passwordConfirm: event.target.value.trim(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, email, password, passwordConfirm } = this.state;

    if (username === '') {
      this.setState({
        hasUsernameInputError: true,
      });
      return;
    }

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

    if (passwordConfirm === '') {
      this.setState({
        hasPasswordConfirmInputError: true,
      });
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL_BASE}/api/v1/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: username,
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
        },
      }),
    });

    this.setState({
      hasRegistered: true,
    });
  }

  render() {
    const {
      hasRegistered,
      username,
      email,
      password,
      passwordConfirm,
      hasUsernameInputError,
      hasEmailInputError,
      hasPasswordInputError,
      hasPasswordConfirmInputError,
    } = this.state;
    const { classes } = this.props;

    if (!hasRegistered) {
      return (
        <React.Fragment>
          <Container maxWidth='xs'>
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Sign Up
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
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  value={username}
                  onChange={this.handleUsernameChange}
                  error={hasUsernameInputError}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  value={email}
                  onChange={this.handleEmailChange}
                  error={hasEmailInputError}
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
                  error={hasPasswordInputError}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='passwordConfirm'
                  label='PasswordConfirm'
                  type='password'
                  id='passwordConfirm'
                  autoComplete='current-passwordConfirm'
                  value={passwordConfirm}
                  onChange={this.handlePasswordConfirmChange}
                  error={hasPasswordConfirmInputError}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Container>
        </React.Fragment>
      );
    }
    return (
      <Switch>
        <Redirect to='/login' />
      </Switch>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isLoggedIn: PropTypes.bool,
};

SignUpForm.defaultProps = {
  isLoggedIn: false,
};

export default withStyles(styles)(SignUpForm);
