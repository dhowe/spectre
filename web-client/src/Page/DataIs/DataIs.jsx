import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown-now';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
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

class DataIs extends NavigationHack {
  constructor(props) {
    super(props, '/personalised-experience');
  }

  render() {
    const { classes } = this.props;
    this.context.virtue = this.context.virtue || 'power';
    const virtue = this.context.virtue;
    const virtueAs = this.context.virtueAsAdverb();
    const timer = ({ seconds, completed }) => {
      if (completed) {
        // Render a complete state
        return null;
      } else {
        // Render a countdown
        return <span>{seconds}</span>;
      }
    };
    console.log('User:', this.context);
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <Typography component="h6" variant="h6">DATA IS {virtue.toUpperCase()}</Typography>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '1200ms' }}>

            <Typography component="h6" variant="h6">To become more {virtueAs} you need&nbsp;more&nbsp;data</Typography>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '2000ms' }}>
            <Typography component="h6" variant="h6">We can help you believe in the {virtue}&nbsp;of&nbsp;Dataism.</Typography>
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

DataIs.propTypes = {
  classes: PropTypes.object.isRequired,
};
DataIs.contextType = UserSession;

export default withStyles(styles)(DataIs);
