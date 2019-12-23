import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown-now';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import NavigationHack from '../NavigationHack';

import './PersonalisedExperience.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  glow: {
    color: '#ffd700',
  },
};

class PersonalisedExperience extends NavigationHack {
  constructor(props) {
    super(props, '/game');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + ' PersonalisedExperience'}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <div>
          <Fade in>
            <p className="copy" style={{marginTop: '200px'}}>
              In order to create a&nbsp;
              <br/ >
              <strong>personalised experience</strong>
            </p>
          </Fade>
          <Fade in style={{transitionDelay: '1000ms'}}>
            <p className="copy" style={{ marginBottom: '200px', fontWeight:'light', }}>
              Tell us what you love,
              tell us what <br/> you hate...
            </p>
          </Fade>
          </div>
            <div className="hidden">
              <Countdown
                onComplete={this.next}
                date={Date.now() + 5000}
                renderer={() => null}
              />
            </div>
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
