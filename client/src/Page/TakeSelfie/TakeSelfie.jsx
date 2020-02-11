import React from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserSession from '../../Components/UserSession/UserSession';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Button from '@material-ui/core/Button';
import IconButton from '../../Components/IconButton/IconButton';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentStyles from '../../App.module.css';
import Countdown from 'react-countdown';

import { withStyles } from '@material-ui/core/styles';
import './TakeSelfie.scss';

const styles = {};

// 0. Large-text at top: "Lets take a selfie!"
// 1. Should provide user with a countdown (like photo-booth)
// 2. Should display the image after (perhaps in overlay)
// 3. Should give the user the choice to retake or accept the image
class TakeSelfie extends React.Component {
  constructor(props) {
    super(props, '/personalised');
    this.state = {
      captureNow: false,
      now: Date.now(),
      reset: Date.now(),
    };
    this.webcam = React.createRef();
    this.countdowner = React.createRef();
  }

  handleClick = (c) => {
    this.clicked = c;
    this.countdowner.start();
    if (c === 'capture') {
      this.setState({ captureNow: true });
    }
  }

  takeSelfie = () => {
    this.setState({ reset: (new Date().getTime()), now: Date.now() });
    try {
      console.log('[WEBCAM] Taking selfie...');
      const data = this.webcam.getScreenshot();
      this.setState({ captureNow: false, imgData: data })
    }
    catch (e) {
      console.error('Webcam Error: ', e);
    }
  }

  processSelfie = () => {
    console.log('[WEBCAM] Uploading selfie...');
    if (!UserSession.uploadImage(this.context, this.state.imgData)) {
      console.error('[WEBCAM] Error: failed to upload selfie');
    }
    this.props.history.push('/personalised');
    //setTimeout(() => this.props.history.push('/personalised'), 2000);
  }

  render() {
    console.log('RENDER: imgData=',this.state.imgData);
    const { classes } = this.props;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };
    const imagePreview = this.state.imgData ?
      (<div><img className={ComponentStyles.imgPreview}
        src={this.state.imgData} alt="img" /></div>) : null;
    return (
      <div className="TakeSelfie content">
        <SpectreHeader colour="white" />
        <IdleChecker />
        {imagePreview}
        <div className={ComponentStyles.webcamVideo}>
          <Webcam
            audio={false}
            height={1280}
            width={800}
            ref={r => this.webcam = r}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints} />
        </div>
        <div className={ComponentStyles.buttonWrapper2}>
          <p>Look up and smile for the camera!</p>
          <Button className={ComponentStyles.button} variant="outlined" color="primary"
            onClick={() => this.handleClick('capture')}>
            {this.state.imgData ? "Retake" : "Capture"}
          </Button>
        </div>
        <Countdown autoStart={false}
          date={this.state.now + 3000}
          intervalDelay={1000}
          precision={1000}
          ref={r => this.countdowner = r}
          renderer={props => <div>{this.state.captureNow ?
            Math.round(props.total / 1000) : 'Ready?'}</div>}
          onComplete={e => e ? this.takeSelfie() : null}
          key={this.state.reset}
        />
        <div className={classes.clickToContinue}>
        <Link to="/personalised">
          <IconButton
            onClick={this.processSelfie}
            enabled={typeof this.state.imgData !== 'undefined'}
            className={ComponentStyles.iconButtonStyle1}
            icon="next" text="Next" />
            </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

TakeSelfie.propTypes = {
  classes: PropTypes.object.isRequired,
};
TakeSelfie.contextType = UserSession;

export default withStyles(styles)(TakeSelfie);
