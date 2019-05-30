import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Countdown from 'react-countdown-now';

import "./PersonalisedExperience.scss";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",

    color: 'black'
  },
  clickToContinue: {
    margin: "20% 0",
  },
  glow: {
    color: '#ffd700'
  }
};

class PersonalisedExperience extends React.Component {
  goTo() {
    this.props.history.push('/game');
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
      <div className={classes.root + ' PersonalisedExperience'}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Fade in={true} style={{transitionDelay: '200ms'}}>
            <Typography component="h5" variant="h5">Excellent</Typography>
          </Fade>
          <Fade in={true} style={{transitionDelay: '200ms'}}>
            <Typography component="h5" variant="h5">In order to create a <strong>personalised experience</strong></Typography>
          </Fade> 
          <Fade in={true} style={{transitionDelay: '200ms'}}>
            <Typography component="h6" variant="h6" >tell us what you love, tell us what you hate...</Typography>
          </Fade>  
          <Countdown
            onComplete={this.goTo.bind(this)}
            date={Date.now() + 5000}
            renderer={timer}
          />
        </div >
        <FooterLogo />
      </div>
    );
  }
}

PersonalisedExperience.propTypes = {
  classes: PropTypes.object.isRequired,
};

PersonalisedExperience.contextType = UserSession;

export default withStyles(styles)(PersonalisedExperience);
