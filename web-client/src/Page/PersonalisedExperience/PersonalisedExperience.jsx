import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
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
  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
  }

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
        <div className={`${classes.content} content`}>
          <Fade in style={{transitionDelay: '500ms'}}>
            <Typography component="h5" variant="h5">
              In order to create a&nbsp;
              <br/><strong>personalised experience</strong>
            </Typography>
          </Fade>
          <Fade in style={{transitionDelay: '2000ms'}}>
            <Typography component="h6" variant="h6">
            tell us what you love,
            <br/>tell us what you hate...
            </Typography>
          </Fade>
          <Fade in style={{transitionDelay: '2500ms'}}>
            <Countdown
              onComplete={this.goTo}
              date={Date.now() + 50000}
              renderer={timer}
            />
          </Fade>
        </div>
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
