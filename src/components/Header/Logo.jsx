import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appLogo: {
    marginRight: '20px',
  },
}));

export default function Logo() {
  const classes = useStyles();

  return (
    <div className={classes.appLogo}>
      <Typography variant='h5' color='inherit' noWrap>
        ArticlesSlate
      </Typography>
    </div>
  );
}
