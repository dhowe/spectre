import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import NavigationHack from '../NavigationHack';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

class InsightComplete extends NavigationHack {
  constructor(props) {
    super(props, '/your-power');
  }

  render() {
    const { classes } = this.props;
    if (typeof this.context.target === 'undefined') {
      this.context.setTarget({ "id": "111111111111111111111111", "name": "Remy", "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 } });
    }
    const targetName = this.context.getTarget().name;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h3" variant="h4">Verification complete. </Typography>
              <Typography component="h6" variant="h6">You've unlocked {targetName}’s OCEAN profile.</Typography>
              {/* INSERT OCEAN TOPBAR COMPONENT HERE (1080x450)*/}
              <OceanProfile subject={this.context.getTarget()} classes={classes}></OceanProfile>
              <Typography component="h6" variant="h6">You now have the <strong>power</strong> to influence {targetName}.</Typography>
              <Link to="/your-power">
                  <IconButton icon="next" text="Next" />
              </Link>
          </div>
          <FooterLogo />
      </div >
    );
  }
}

InsightComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};
InsightComplete.contextType = UserSession;

export default withStyles(styles)(InsightComplete);
