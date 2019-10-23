import React from 'react';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

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
      error: null,
      isLoaded: false,
      articleID: this.props.match.params.id,
      article: [],
    };
  }

  fetchArticleData(id) {
    fetch(`${process.env.REACT_APP_API_URL_BASE}/api/v1/articles/${id}`)
      .then(res => res.json())
      .then(
        result => {
          console.log(result['article']);
          this.setState({
            isLoaded: true,
            article: result['article'],
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { classes } = this.props;
    const { isLoaded, articleID, article } = this.state;

    if (!isLoaded) {
      this.fetchArticleData(articleID);
      return <h2>fetch article with ID {articleID}...</h2>;
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
            <Button size='small' color='primary'>
              Edit
            </Button>
            <Button size='small' color='primary'>
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ArticlesViewer);
