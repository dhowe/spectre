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

class Pledge extends React.Component {
  componentDidMount() {
    if (!this.context.name) this.context.name = 'Barney'; // TMP: remove
    console.log('User:', this.context);
  }

  goTo() {
    this.props.history.push('/searching-for');
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
          <div className={classes.content + " content"}>
              <Fade in={true} style={{transitionDelay: '200ms'}}>
                <Typography component="h6" variant="h5">Welcome to the altar of dataism.</Typography>
              </Fade>
              <Fade in={true} style={{transitionDelay: '3200ms'}}>
                <Typography component="h6" variant="h6">Our technologies can tell you things about yourself that you don’t know.</Typography>
              </Fade>
              <Fade in={true} style={{transitionDelay: '6400ms'}}>
                <Typography component="h6" variant="h6">In order for us to do this, first we need to get to know you a little bit.</Typography>
              </Fade>
              <Countdown
                onComplete={this.goTo.bind(this)}
                date={Date.now() + 5000}
                renderer={timer}
              />
              <Link ref="next" hidden to="/searching-for">
                  <IconButton icon="next" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

Pledge.propTypes = {
  classes: PropTypes.object.isRequired,
};
Pledge.contextType = UserSession;

export default withStyles(styles)(Pledge);
