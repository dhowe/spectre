import React from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
//import colours from '../../colors.scss';

const styles = {};

class Pledge extends React.Component {
  constructor(props) {
    super(props, '/searching');
    this.timeout1 = -1;
    this.timeout2 = -1;
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  async componentDidMount() {
    this.timeout1 = setTimeout(() =>
      this.context.goto(this.props, '/searching'), 7500);
      //this.props.history.push('/searching'), 7500);
    this.timeout2 = setTimeout(this.captureImage, 4000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }

  captureImage = () => {
    try {
      console.log('[PLEDGE] Taking image...');
      if (!UserSession.uploadImage(this.context, this.webcam.getScreenshot())) {
        console.error('[PLEDGE] Error: webcam not available[1]');
        if (!UserSession.uploadImage(this.context, this.webcam.getScreenshot())) {
          console.error('[PLEDGE] Error: webcam not available[2]');
        }
      }
    }
    catch (e) {
      console.error('[WEBCAM] Caught: ', e);
    }
    console.log('[WEBCAM] DONE');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <div className="pledge">
            <Fade in timeout={1000}>
              <h1 className="addSpacing">
                Welcome to the altar of <span>Dataism</span>.
              </h1>
            </Fade>
            <Fade in timeout={1000} style={{ transitionDelay: '2500ms' }}>
              <p className="normal">Our technologies can tell you things<br/> about yourself that you don’t know.</p>
            </Fade>
            <Fade in timeout={1000} style={{ transitionDelay: '4500ms' }}>
              <p className="normal"><br/>In order for us to do this, first we need<br/> to get to know you a little bit.</p>
            </Fade>
          </div>
          <div className="ImageCapture">
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotQuality={1}
              screenshotFormat="image/jpeg"
              width={1280}
              height={720}
              style={{ left: '-5000px', position: 'fixed' }}
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user"
              }}
            />
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Pledge.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
Pledge.contextType = UserSession;

export default withStyles(styles)(Pledge);
