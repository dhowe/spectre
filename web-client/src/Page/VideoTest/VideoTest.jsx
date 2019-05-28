import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserSession from '../../Components/UserSession/UserSession';
import { Link, Redirect } from 'react-router-dom';
import Webcam from "react-webcam";
import './VideoTest.scss'

const styles = {};

class VideoTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toNext: false };
  }
  renderRedirect() {
    if (this.state.toNext) {
      return <Redirect to='/touch-to-begin' />
    }
  }
  render() {
    const { classes } = this.props;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
      <div className='VideoTest'>
        <Webcam
          audio={false}
          height={250}
          width={250}
          ref={this.setRef}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints} />
        <Link to='/touch-to-begin'>
            <div className={classes.clickToContinue}>
                <Typography>Touch to Begin</Typography>
            </div>
        </Link>
    </div >
    );
  }
}

VideoTest.propTypes = {
  classes: PropTypes.object.isRequired,
};
VideoTest.contextType = UserSession;

export default withStyles(styles)(VideoTest);
