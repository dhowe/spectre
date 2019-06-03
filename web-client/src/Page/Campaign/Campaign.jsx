import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

class Campaign extends React.Component {

  render() {
    const { classes } = this.props;
    if (typeof this.context.target === 'undefined') {
      this.context.setTarget({ "id": "111111111111111111111111", "name": "Remy", "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 } });
    }
    return (
      <div className={classes.root}>
          <OceanProfile subject={this.context.getTarget()} ></OceanProfile>
          <div className={classes.content + " content"}>
              <Fade in={true} style={{transitionDelay: '200ms'}}>
                <Typography component="h6" variant="h6">The {(this.context.adIssue || 'Remain')} campaign is in jeopardy.</Typography>
              </Fade>
              <Fade in={true} style={{transitionDelay: '400ms'}}>
                <Typography component="h6" variant="h6">Longer delays to Brexit increase the {((this.context.adIssue || 'Remain') === 'leave' ? 'risk' : 'chance')} of it not happening.</Typography>
              </Fade>
              <Fade in={true} style={{transitionDelay: '600ms'}}>
                <Typography component="h6" variant="h6">We’re going to run a ‘grassroots’ campaign to influence {(this.context.targetName || 'Daniel')} to vote {(this.context.adIssue || 'Remain')} in the next referendum.</Typography>
              </Fade>
              <Link to="/dark-ad">
                  <IconButton icon="next" text="Ready" />
              </Link>
          </div>
          <FooterLogo />
      </div>
    );
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired,
};
Campaign.contextType = UserSession;
export default withStyles(styles)(Campaign);
