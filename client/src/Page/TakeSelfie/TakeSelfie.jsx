import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import UserSession from '../../Components/UserSession/UserSession';
import './TakeSelfie.scss';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Button from '@material-ui/core/Button';
import IconButton from '../../Components/IconButton/IconButton';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import Fade from '@material-ui/core/Fade';
import ComponentsStyles from '../../App.module.css';
import Countdown from 'react-countdown';

const styles = {};

// 0. Large-text at top: "Lets take a selfie!"
// 1. Should provide user with a countdown (like photo-booth)
// 2. Should display the image after (perhaps in overlay)
// 3. Should give the user the choice to retake or accept the image
class TakeSelfie extends React.Component {
  constructor(props) {
    super(props, '/pledge');
    this.state = {
      captureNow: false,
      now: Date.now(),
      img: null
    };
    this.countdowner = React.createRef();

  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  handleClick(c) {
    this.clicked = c;
    console.log(this.countdowner)
    //this.countdowner.date = Date.now() + 4000;
    this.countdowner.start();
    if (c === 'capture')
      this.setState({ captureNow: true });
  }


  handlePhotoShoot(virtue) {

    const user = this.context;
    user.virtue = virtue;

    try {
      console.log('[WEBCAM] Taking image...');
      const data = this.webcam.getScreenshot();
      this.setState({ captureNow: false });
      this.setState({ imgData: data })
      /*
      if (data && data.length) {
        const imgfile = this.toImageFile(data, user._id + '.jpg');
        UserSession.postImage(this.context, imgfile,
          (json) => {
            this.context.hasImage = true;
            this.props.history.push('/data-is');
            return;
          },
          (e) => {
            console.error('Error', e);
            this.context.hasImage = false;
            this.props.history.push('/data-is');
            return;
          }
        );
      }
      else {
        console.error('Webcam not available');
        this.context.hasImage = false;
        this.props.history.push('/data-is');
        return;
      }*/
    }
    catch (e) {
      console.error('Webcam Error: ', e);
    }


  }

  render() {
    const { classes } = this.props;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };
    return (

      <div className="TakeSelfie content">
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div><img className={ComponentsStyles.imgPreview} src={this.state.imgData} alt="img" /></div>
        <div className={ComponentsStyles.webcamVideo}>
          <Webcam
            audio={false}
            height={1280}
            width={800}
            ref={this.setRef}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints} />
        </div>
        <div className={ComponentsStyles.buttonWrapper2}>
          <p>Look up and smile for the camera!</p>
          <Button className={ComponentsStyles.button} variant="outlined" color="primary" onClick={() => this.handleClick('capture')}>{this.state.imgData === undefined ? "Capture" : "Retake"}</Button>

        </div>
        <Countdown autoStart={false}
          date={this.state.now + 3000}
          intervalDelay={1000}
          precision={1000}
          ref={e => this.countdowner = e}
          renderer={props => <div>{this.state.captureNow ? Math.round(props.total / 1000) : 'Ready?'}</div>}
          onComplete={e=> e? this.handlePhotoShoot() : null}
        />
        <Link to="/pledge">
          <div className={classes.clickToContinue}>
            <IconButton enabled={this.state.imgData !== undefined} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
          </div>
        </Link>
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
