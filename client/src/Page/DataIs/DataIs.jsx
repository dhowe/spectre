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
    this.countdown = React.createRef();
  }

  // componentDidMount() { // override navigate from SpectrePage
  //   document.removeEventListener('keyup', this.navigate);
  //   document.addEventListener('keyup', this.onKeyUp);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('keyup', this.onKeyUp);
  //   document.addEventListener('keyup', this.navigate);
  //   clearTimeout(this.timeout);
  // }
  //
  //   onKeyUp = (e) => {  // override navigate from SpectrePage
  // //    e && e.preventDefault();
  //     console.log('DataIs.navigate', e);
  //     //this.timeout = setTimeout(this.handleSubmit(0, this.state), 1500);
  //   }

  navigate = (e) => {
    console.log('DataIs.navigate', e);
  }

  render() {
    const user = this.context;
    user.virtue = user.virtue || 'power';
    UserSession.log(this.context);

    return (
      <div className={this.props.root}>
        <SpectreHeader colour="white" />
        <div className={`${this.props.content} content`}>
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
            ref={e => this.countdown = e}
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
