import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  container: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
});
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { error, errorInfo } = this.state;
    const { classes, children } = this.props;

    if (errorInfo) {
      // Error path
      return (
        <Container maxWidth='xs' className={classes.container}>
          <h2>Something went wrong.</h2>
          <details>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </Container>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ErrorBoundary);
