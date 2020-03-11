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

class TakeSelfie extends React.Component {

  constructor(props) {
    super(props, '/personalised');
    this.state = {
      now: Date.now(),
      captureNow: false,
      pageOne: { display: 'block' },
      pageTwo: { display: 'none' },
      pageThree: { display: 'none' },
    };
    this.webcam = React.createRef();
    this.countdowner = React.createRef();
  }

  async componentDidMount() {
    await UserSession.ensure(this.context, ['name', 'login']);
  }

  handleClick = (c) => {
    this.clicked = c;
    if (c === 'capture') {

      this.setState({ now: Math.floor(Date.now()/1000)*1000 })
      this.setState({ captureNow: true })
      this.setState({ pageOne: { display: 'none' }, pageTwo: { display: 'block' }, pageThree: { display: 'none' } })
      this.countdowner.start();
    };
  }

  takeSelfie = () => {
    try {
      console.log('[WEBCAM] Taking selfie...');
      const data = this.webcam.getScreenshot();
      this.setState({captureNow: false, imgData: data })
      this.setState({ pageOne: { display: 'none' }, pageTwo: { display: 'none' }, pageThree: { display: 'block' } })
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
    this.context.goto(this.props, '/personalised');
  }

  render() {
    const { classes } = this.props;

    const imagePreview = this.state.imgData ?
      (<div className={ComponentStyles.imageCropper}>
          <img className={ComponentStyles.imgPreview}
            src={this.state.imgData} alt="img" />
      </div>) : null;

    return (
      <div className="TakeSelfie content">
        <SpectreHeader colour="white" />
        <IdleChecker />

        <div style={this.state.pageOne}>
          <Webcam  //to force the webcam ready
            audio={false}
            height={1280}
            width={800}
            ref={r => this.webcam = r}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: 'user',
            }} style={this.state.pageTwo} />
          <h1 className="addSpacing"><span>Personalise your experience</span></h1>
          <div className={ComponentStyles.buttonWrapper2}>
            <Button className={ComponentStyles.button} variant="outlined" color="primary"
              onClick={() => this.handleClick('capture')}>
              {this.state.imgData ? "Retake" : "Take a selfie"}
            </Button>
          </div>
        </div>

        <div style={this.state.pageTwo}>
          <h1 className="addSpacing"><span>Look up and smile for the camera!</span></h1>
          <div className={ComponentStyles.webcamVideo}>
            <Webcam
              audio={false}
              height={1280}
              width={800}
              ref={r => this.webcam = r}
              screenshotQuality={1}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: 'user',
              }} />
            <img className={ComponentStyles.photoFrame} alt="frame" src="./imgs/photoFrame.svg" />
            <div className={ComponentStyles.countDown}>
              <Countdown
              autoStart={false}
                date={this.state.now + 2600}
                intervalDelay={1000}
                precision={1000}
                ref={r => this.countdowner = r}
                renderer={props => <p className="countDownLabel">{this.state.captureNow ?
                  (Math.floor(props.total / 1000) > 3 ? 3 : Math.floor(props.total / 1000)) : ''}</p>}
                onComplete={e => e ? this.takeSelfie() : null}
              />
            </div>
          </div>
        </div>

        <div style={this.state.pageThree}>
          <h1 className="addSpacing"><span><br /><br /><br />Happy with your look?</span></h1>
          <div className={ComponentStyles.imgPreviewDiv}>
            {imagePreview}
          </div>
          <div className={ComponentStyles.buttonWrapper2}>
            <Button className={ComponentStyles.button} variant="outlined" color="primary"
              onClick={() => this.handleClick('capture')}>
              {this.state.imgData ? "Take again" : "Take a selfie"}
            </Button>
          </div>
          <div className={classes.clickToContinue}>
            <Link to="/personalised">
              <IconButton
                onClick={this.processSelfie}
                enabled={typeof this.state.imgData !== 'undefined'}
                className={ComponentStyles.iconButtonStyle1}
                icon="next" text="Next" />
            </Link>
          </div>
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
