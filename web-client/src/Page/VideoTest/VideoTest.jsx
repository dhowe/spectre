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

  // setRef = webcam => {
  //   this.webcam = webcam;
  // }
  //
  // handleSuccess = (json) => {
  //   console.log(json.url);
  //   this.setState(() => ({ toNext: true }));
  // }
  //
  // captureImage = () => {
  //   let user = this.context;
  //   let data = this.webcam.getScreenshot();
  //   let imgfile = this.toImageFile(data, user._id + '.jpg');
  //   UserSession.postImage(this.context, imgfile, this.handleSuccess,
  //     e => console.error("Error", e));
  // }
  //
  // toImageFile = (data, fname) => {
  //   let arr = data.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], fname, { type: mime });
  // }

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
