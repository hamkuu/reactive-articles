import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import TabButton from './TabButton';

const useStyles = makeStyles(theme => ({
  navTabsContainer: {
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  indicator: {
    display: 'none',
  },
}));

export default function NavTabs() {
  const classes = useStyles();

  return (
    <>
      <Tabs
        variant='standard'
        className={classes.navTabsContainer}
        classes={{ indicator: classes.indicator }}
        value={false}
      >
        <TabButton buttonText='Articles List' url='/' />
        <TabButton buttonText='New an Article' url='/newarticle' />
      </Tabs>
    </>
  );
}
