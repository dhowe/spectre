import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import NavigationHack from '../NavigationHack';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
};

class TargetAd extends NavigationHack {
  constructor(props) {
    super(props, '/success-ad');
  }

  render() {
    const { classes } = this.props;
    this.context.adIssue = this.context.adIssue || 'leave';
    this.context.target = this.context.target || UserSession.defaults[0];
    const tname = this.context.target.name;
    return (
      <div className={classes.root}>
      <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
      <div className={`${classes.content} content`}>
        <br/>
        <Typography component="h6" variant="h6">
          Share your targeted ad with <strong>{tname}</strong>?
        </Typography>

          <Grid container justify="center">
            <Grid item>
              <Link to="/success-ad">
              <IconButton icon="tick" text="Yes"/>
              </Link>
            </Grid>
            <Grid item>
            <Link to="/we-are-sorry">
              <IconButton icon="next" text="No" />
              </Link>
            </Grid>
          </Grid>

        <br/>
      </div>
      <FooterLogo />
    </div>
    );
  }
}

TargetAd.contextType = UserSession;
TargetAd.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TargetAd);
