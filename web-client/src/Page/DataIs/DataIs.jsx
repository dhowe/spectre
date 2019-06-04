import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
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

class DataIs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { toTest: false }; // TMP
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleKeyUp(evt) {// TMP
    if (evt.key === ' ') this.setState(() => ({ toTest: true }));
  }
  componentDidMount() {// TMP
    document.addEventListener("keyup", this.handleKeyUp);
  }
  componentWillUnmount() {// TMP
    document.removeEventListener("keyup", this.handleKeyUp);
  }
  renderRedirect() {// TMP
    if (this.state.toTest) return <Redirect to='/image-test' />
  }
  goTo() {
    this.props.history.push('/personalised-experience');
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
    console.log('User:', this.context);
    return (
      <div className={classes.root}>
        {this.renderRedirect()} {/* tmp */}
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Fade in={true} style={{transitionDelay: '200ms'}}>
            <Typography component="h6" variant="h6">DATA IS {(this.context.virtue || 'power').toUpperCase()}</Typography>
          </Fade>
          <Fade in={true} style={{transitionDelay: '1200ms'}}>

            <Typography component="h6" variant="h6">To become more powerful you need more data</Typography>
          </Fade>
          <Fade in={true} style={{transitionDelay: '2000ms'}}>
            <Typography component="h6" variant="h6">We can help you believe in the power of dataism.</Typography>
          </Fade>
          <Countdown
            onComplete={this.goTo.bind(this)}
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
