import React from 'react';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

import { retrieveIsLoggedInCookie } from '../../helpers/universalCookie';

import MessageBox from '../Common/MessageBox';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    padding: `${theme.spacing(2)}px 0`,
  },
});

class ArticlesViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      responseStatus: false,
      isLoaded: false,
      isDeleted: false,
      articleID: this.props.match.params.id,
      article: [],
    };
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: retrieveIsLoggedInCookie(),
    });
  }

  fetchArticleData(id) {
    fetch(`${process.env.REACT_APP_API_URL_BASE}/api/v1/articles/${id}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          responseStatus: result['status'],
          isLoaded: true,
          article: result['article'],
        });
      });
  }

  removeArticle(id) {
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(
      `${process.env.REACT_APP_API_URL_BASE}/api/v1/articles/${id}`,
      requestOptions
    ).then(response => {
      if (response.ok) {
        this.setState({
          isDeleted: true,
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const {
      isLoggedIn,
      responseStatus,
      isLoaded,
      isDeleted,
      articleID,
      article,
    } = this.state;
    const editArticleURL = `/editarticles/${articleID}`;

    if (!isLoggedIn) {
      return <MessageBox message='Please login first.'></MessageBox>;
    }

    if (!isLoaded) {
      this.fetchArticleData(articleID);
      return <MessageBox message='fetching the article...'></MessageBox>;
    }

    if (!responseStatus) {
      return <MessageBox message='Article not found.'></MessageBox>;
    }

    if (isDeleted) {
      return <MessageBox message='Article has been removed.'></MessageBox>;
    }

    return (
      <div className={classNames(classes.layout)}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {article['title']}
            </Typography>
            <Typography>by {article['author']}</Typography>
            <Typography>{article['content']}</Typography>
          </CardContent>
          <CardActions>
            <Button size='small' color='primary' href={editArticleURL}>
              Edit
            </Button>
            <Button
              size='small'
              color='primary'
              onClick={() => {
                this.removeArticle(articleID);
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ArticlesViewer);
