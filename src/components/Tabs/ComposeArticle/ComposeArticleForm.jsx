import React from 'react';

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
      title: '',
      content: '',
      hasTitleInputError: false,
      hasContentInputError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
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

    const { title, content } = this.state;
    // const { setAppLogInState, setAppLogOutState } = this.props;

    console.log(title);
    console.log(content);

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
          author: 'author_react',
          title: title,
          content: content,
        },
      }),
    });
  }

  render() {
    const {
      title,
      content,
      hasTitleInputError,
      hasContentInputError,
    } = this.state;
    const { classes } = this.props;

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
