import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown-now';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectrePage from '../SpectrePage';

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

class DataIs extends SpectrePage {
  constructor(props) {
    super(props, '/personalised-experience');
  }

  componentDidMount() {
    let user = this.context;
    UserSession.update(this.context, json => {
      console.log('['+user.lastPage().uc() +'] '
        + user.name + ' / ' + user.gender + ' / ' +user.virtue);
    });
  }

  render() {
    let user = this.context;
    user.virtue = user.virtue || 'power';

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <Typography component="h6" variant="h6">DATA IS {user.virtue.toUpperCase()}</Typography>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '1200ms' }}>
            <Typography component="h6" variant="h6">To become more {user.virtueAsAdverb()} you need&nbsp;more&nbsp;data</Typography>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '2000ms' }}>
            <Typography component="h6" variant="h6">We can help you believe in the {user.virtue}&nbsp;of&nbsp;Dataism.</Typography>
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

DataIs.propTypes = {
  classes: PropTypes.object.isRequired,
};
DataIs.contextType = UserSession;

export default withStyles(styles)(DataIs);
