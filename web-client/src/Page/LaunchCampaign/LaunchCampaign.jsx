import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import NavigationHack from '../NavigationHack';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class LaunchCampaign extends NavigationHack {
  constructor(props) {
    super(props, '/referendum-results');
  }

  render() {
    const { classes } = this.props;
    const launchImg = `/imgs/vote-${(this.context.adIssue || 'remain')}.png`;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <Typography component="h6" variant="h6" style={{ marginTop: '300px' }}>Launch Campaign!</Typography>
          <Link to="/referendum-results" style={{ marginBottom: '500px' }}>
            <img
              className={classes.image}
              src={launchImg}
              alt="launch campaign"
            />
          </Link>
          <Link to="/referendum-results">
              <IconButton icon="next" text="Go" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

LaunchCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
};
LaunchCampaign.contextType = UserSession;

export default withStyles(styles)(LaunchCampaign);
