import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    margin: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function ArticleInstance(props) {
  const classes = useStyles();
  const { id, author, title, content } = props;
  const articleURL = `/articles/${id}`;

  return (
    <>
      <Grid item key={id}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography>by {author}</Typography>
            <Typography>{content}</Typography>
          </CardContent>
          <CardActions>
            <Button size='small' color='primary' href={articleURL}>
              Admin
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

ArticleInstance.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
