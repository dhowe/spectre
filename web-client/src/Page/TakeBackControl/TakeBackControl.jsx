import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black',
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class TakeBackControl extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6">Take back control? </Typography>
              <Typography component="h6" variant="h6">Delete your data from Spectre’s system?</Typography>
              <Grid container justify="center">
                  <Grid item>
                      <Link to="/we-are-sorry">
                          <IconButton icon="tick" text="Keep" />
                      </Link>
                  </Grid>
                  <Grid item>
                      <Link to="/we-are-sorry">
                          <IconButton icon="x" text="Delete" />
                      </Link>
                  </Grid>
              </Grid>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

TakeBackControl.propTypes = {
  classes: PropTypes.object.isRequired,
};
TakeBackControl.contextType = UserSession;

export default withStyles(styles)(TakeBackControl);
