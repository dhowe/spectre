import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import './VideoTest.scss';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {};

class VideoTest extends React.Component {
  render() {
    const { classes } = this.props;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };
    return (
      <div className="VideoTest">
        <Webcam
          audio={false}
          height={800}
          width={800}
          ref={this.setRef}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints} />
        <Link to="/touch-to-begin">
          <div className={classes.clickToContinue}>
            <Typography>Touch to Begin</Typography>
          </div>
        </Link>
    </div>
    );
  }
}

VideoTest.propTypes = {
  classes: PropTypes.object.isRequired,
};
VideoTest.contextType = UserSession;

export default withStyles(styles)(VideoTest);
