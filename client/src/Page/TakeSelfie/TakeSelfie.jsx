import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import UserSession from '../../Components/UserSession/UserSession';
import './TakeSelfie.scss';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Button from '@material-ui/core/Button';
import IconButton from '../../Components/IconButton/IconButton';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {};

// 0. Large-text at top: "Lets take a selfie!"
// 1. Should provide user with a countdown (like photo-booth)
// 2. Should display the image after (perhaps in overlay)
// 3. Should give the user the choice to retake or accept the image
class TakeSelfie extends React.Component {
  render() {
    const { classes } = this.props;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };
    return (
      <div className="TakeSelfie">
      <SpectreHeader colour="white" />
      <IdleChecker />
        <Webcam
          audio={false}
          height={1280}
          width={800}
          ref={this.setRef}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints} />
          <p>Look up and smile for the camera!</p>
          <div className={ComponentsStyles.buttonWrapper}>
            <Button className={ComponentsStyles.button} variant="contained" color="primary" onClick={() => this.handleClick('power')}>Capture</Button>
          </div>

        <Link to="/pledge">
          <div className={classes.clickToContinue}>
              <IconButton enabled={true} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next"/>
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
