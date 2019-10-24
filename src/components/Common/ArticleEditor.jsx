import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import MessageBox from '../Common/MessageBox';

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

class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      content: '',
      articleID: this.props.match.params.id,
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

  handleAuthorChange(event) {
    this.setState({
      hasAuthorInputError: false,
      author: event.target.value.trim(),
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

  fetchArticleData(id) {
    fetch(`${process.env.REACT_APP_API_URL_BASE}/api/v1/articles/${id}`)
      .then(res => res.json())
      .then(result => {
        console.log(result['article']);
        this.setState({
          isLoaded: true,
          articleID: this.props.match.params.id,
          responseStatus: result['status'],
          author: result['article']['author'],
          title: result['article']['title'],
          content: result['article']['content'],
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { author, title, content, articleID } = this.state;

    if (author === '') {
      this.setState({
        hasAuthorInputError: true,
      });
      return;
    }

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

    fetch(
      `${process.env.REACT_APP_API_URL_BASE}/api/v1/articles/${articleID}`,
      {
        method: 'PUT',
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
      }
    );

    this.setState({
      hasSubmitted: true,
    });
  }

  render() {
    const {
      author,
      title,
      content,
      isLoaded,
      articleID,
      hasAuthorInputError,
      hasTitleInputError,
      hasContentInputError,
      hasSubmitted,
    } = this.state;
    const { classes } = this.props;

    if (!isLoaded) {
      this.fetchArticleData(articleID);
      return <h2>fetch article with ID {articleID}...</h2>;
    }

    if (hasSubmitted) {
      return <MessageBox message='Article submitted.'></MessageBox>;
    }

    return (
      <React.Fragment>
        <Container maxWidth='xs'>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Edit an existing article
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
                label='Article Author'
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

export default withStyles(styles)(ArticleEditor);
