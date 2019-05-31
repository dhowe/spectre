import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserSession from '../../Components/UserSession/UserSession';
import { Link, Redirect } from 'react-router-dom';
import Webcam from "react-webcam";
import './TakeSelfie.scss'

const styles = {};

class TakeSelfie extends React.Component {
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
      <div className='TakeSelfie'>
        <Webcam
          audio={false}
          height={800}
          width={800}
          ref={this.setRef}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints} />
        <Link to='/pledge'>
            <div className={classes.clickToContinue}>
                <Typography>Look up and smile for the camera!</Typography>
            </div>
        </Link>
    </div >
    );
  }
}

TakeSelfie.propTypes = {
  classes: PropTypes.object.isRequired,
};
TakeSelfie.contextType = UserSession;

export default withStyles(styles)(TakeSelfie);
