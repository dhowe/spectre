import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
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

class DataIs extends React.Component {
  constructor(props) {
    super(props, '/personalised-experience');
    this.countdown = React.createRef();
  }

  // componentDidMount() {
  //   this.setState(
  // }

  render() {
    const user = UserSession.validate(this.context,
      ['login', 'gender', 'name', 'virtue'], true);
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
            onComplete={() => this.props.history.push('/personalised-experience')}
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
