import React from 'react';
import classNames from 'classnames';
import ArticleInstance from './ArticleInstance';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing(4)}px 0`,
  },
});

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
    };
  }

  fetchArticleData() {
    fetch(`${process.env.REACT_APP_API_URL_BASE}/api/v1/articles`)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            response: result,
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
    const { isLoaded, response } = this.state;

    if (!isLoaded) {
      this.fetchArticleData();
      return <h2>fetch articles...</h2>;
    }

    const GalleryGrid = () => (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid item xs={12}>
          {response.map(article => (
            <ArticleInstance
              key={article.id}
              id={article.id.toString()}
              title={article.title}
              author={article.author}
              content={article.content}
            />
          ))}
        </Grid>
      </div>
    );

    return <GalleryGrid />;
  }
}

export default withStyles(styles)(ArticlesList);
