import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown-now';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
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

class YourPower extends NavigationHack {
  constructor(props) {
    super(props, '/pick-your-side');
  }

  render() {
    console.log('User:', this.context);
    const { classes } = this.props;
    const timer = ({ seconds, completed }) => {
      if (completed) {
        // Render a complete state
        return null;
      } else {
        // Render a countdown
        return <span>{seconds}</span>;
      }
    };
    if (typeof this.context.target === 'undefined') {
      this.context.setTarget({ "id": "111111111111111111111111", "name": "Remy", "gender": "male", "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 } });
    }
    return (
      <div className={classes.root}>
        <OceanProfile subject={this.context.getTarget()} />
        <div className={`${classes.content} content`}>
          <Fade in style={{ transitionDelay: '200ms', marginTop: '300px' }}>
            <Typography component="h6" variant="h6">{this.context.name || 'Remy'}, your {this.context.virtue || 'Power'} is growing.</Typography>
          </Fade>
          <Fade in style={{ transitionDelay: '2000ms', marginBottom: '200px' }}>
            <Typography component="h6" variant="h6">Let's put it into practice.</Typography>
          </Fade>
          <Countdown
            onComplete={this.next}
            date={Date.now() + 5000}
            renderer={timer}
          />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

YourPower.propTypes = {
  classes: PropTypes.object.isRequired,
};
YourPower.contextType = UserSession;

export default withStyles(styles)(YourPower);
