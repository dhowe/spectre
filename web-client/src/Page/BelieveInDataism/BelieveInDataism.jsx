import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Countdown from 'react-countdown-now';
import NavigationHack from '../NavigationHack';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

function toAdjPhrase(virtue) {
  const content = {
    influence: 'To become more influential',
    faith: 'To become more faithful',
    wealth: 'To become more wealthy',
    truth: 'To find more truth',
    power: 'To become more powerful',
  };
  return content[virtue];
}

class BelieveInDataism extends NavigationHack {
  constructor(props) {
    super(props, '/steps');
  }


  render() {
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
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <Fade in style={{transitionDelay: '200ms'}}>
            <Typography component="h6" variant="h6">{(toAdjPhrase(this.context.virtue)||"So")}, you need more data.</Typography>
          </Fade>
          <Fade in style={{transitionDelay: '600ms'}}>
            <Typography component="h6" variant="h6">We can help you believe in the {this.context.virtue} of dataism</Typography>
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

BelieveInDataism.propTypes = {
  classes: PropTypes.object.isRequired,
};
BelieveInDataism.contextType = UserSession;

export default withStyles(styles)(BelieveInDataism);
