import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {

};

function Placeholder(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <Button variant="contained" color="secondary" component={Link} to="/touch-to-begin">
            Welcome to the App, click to continue
        </Button>
    </div>
  );
}

export default withStyles(styles)(Placeholder);
