import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  messageBox: {
    margin: theme.spacing(5),
    padding: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
  },
}));

export default function MessageBox(props) {
  const classes = useStyles();
  const { message } = props;

  return (
    <div className={classes.messageBox}>
      <Typography variant='h4' color='inherit' noWrap>
        {message}
      </Typography>
    </div>
  );
}
