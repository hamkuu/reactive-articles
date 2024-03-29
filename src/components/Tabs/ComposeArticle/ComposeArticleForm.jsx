import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { retrieveIsLoggedInCookie } from '../../../helpers/universalCookie';

import MessageBox from '../../Common/MessageBox';

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
});

class ComposeArticleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasCurrentUserLoaded: false,
      author: '',
      title: '',
      content: '',
      hasAuthorInputError: false,
      hasTitleInputError: false,
      hasContentInputError: false,
      hasSubmitted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: retrieveIsLoggedInCookie(),
    });
  }

  fetchProfileData() {
    const profileRequestUrl = `${process.env.REACT_APP_API_URL_BASE}/api/v1/user.info`;

    fetch(profileRequestUrl, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          console.log(response);
          this.setState({
            hasCurrentUserLoaded: true,
            author: response['user_info']['name'],
            errorMessage: null,
          });
        } else {
          this.setState({
            hasCurrentUserLoaded: true,
            profileData: null,
            errorMessage: response.message,
          });
        }
      });
  }

  handleAuthorChange(event) {
    this.setState({
      hasAuthorInputError: false,
      author: event.target.value,
    });
  }

  handleTitleChange(event) {
    this.setState({
      hasTitleInputError: false,
      title: event.target.value.trim(),
    });
  }

  handleContentChange(event) {
    this.setState({
      hasContentInputError: false,
      content: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { author, title, content } = this.state;

    if (title === '') {
      this.setState({
        hasTitleInputError: true,
      });
      return;
    }

    if (content === '') {
      this.setState({
        hasContentInputError: true,
      });
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL_BASE}/api/v1/articles`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          author: author,
          title: title,
          content: content,
        },
      }),
    });

    this.setState({
      hasSubmitted: true,
    });
  }

  render() {
    const {
      isLoggedIn,
      hasCurrentUserLoaded,
      author,
      title,
      content,
      hasAuthorInputError,
      hasTitleInputError,
      hasContentInputError,
      hasSubmitted,
    } = this.state;
    const { classes } = this.props;

    if (!isLoggedIn) {
      return <MessageBox message='Please login first.'></MessageBox>;
    }

    if (hasSubmitted) {
      return <MessageBox message='Article has been submitted.'></MessageBox>;
    }

    if (!hasCurrentUserLoaded) {
      this.fetchProfileData();
    }

    return (
      <React.Fragment>
        <Container maxWidth='xs'>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Compose a new article
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
                id='author'
                label='Article author'
                name='author'
                autoFocus
                value={author}
                error={hasAuthorInputError}
                onChange={this.handleAuthorChange}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='title'
                label='Article Title'
                name='title'
                autoFocus
                value={title}
                error={hasTitleInputError}
                onChange={this.handleTitleChange}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='content'
                label='Article Content'
                name='content'
                multiline={true}
                rows={10}
                rowsMax={20}
                value={content}
                error={hasContentInputError}
                onChange={this.handleContentChange}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ComposeArticleForm);
