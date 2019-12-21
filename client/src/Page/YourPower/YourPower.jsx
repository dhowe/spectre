import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown-now';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import QuickNav from '../QuickNav';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';

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

class YourPower extends QuickNav {
  constructor(props) {
    super(props, '/pick-your-side');
  }

  render() {

    const { classes } = this.props;
    const name = this.context.name;
    let heading = name ? (name+ ', your ') : 'Your ';
    heading += (this.context.virtue || 'Power') + ' is growing.';

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <div className={`${classes.content} content`}>
          <Fade in style={{ transitionDelay: '200ms', marginTop: '300px' }}>
            <Typography component="h6" variant="h6">{heading} </Typography>
          </Fade>
          <Fade in style={{ transitionDelay: '2000ms', marginBottom: '200px' }}>
            <Typography component="h6" variant="h6">Let's put it into practice.</Typography>
          </Fade>
          <Countdown
            onComplete={this.next}
            date={Date.now() + 5000}
            renderer={() => null}
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
