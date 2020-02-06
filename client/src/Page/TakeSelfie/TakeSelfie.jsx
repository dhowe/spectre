import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import UserSession from '../../Components/UserSession/UserSession';
import './TakeSelfie.scss';

const styles = {};

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
        <Webcam
          audio={false}
          height={1280}
          width={800}
          ref={this.setRef}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints} />
        <Link to="/pledge">
          <div className={classes.clickToContinue}>
            <Typography>Look up and smile for the camera!</Typography>
          </div>
        </Link>
    </div>
    );
  }
}

TakeSelfie.propTypes = {
  classes: PropTypes.object.isRequired,
};
TakeSelfie.contextType = UserSession;

export default withStyles(styles)(TakeSelfie);
