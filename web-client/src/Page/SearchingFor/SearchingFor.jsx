import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Webcam from "react-webcam";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  content: {
    paddingTop: "100px",
  },
  clickToContinue: {
    margin: "20% 0",
  },
  button: {
    borderRadius: '28px',
    margin: '16px',
    border: 'solid 3px #929391',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    color: '#929391',
  },
  link: {
    display: 'block',
    marginBottom: '30px',
  },
  profileImage: {
    width: 800,
    height: 1000
  }
};

class SearchingFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toNext: false };
  }
  setRef = webcam => {
    this.webcam = webcam;
  }
  handleSuccess = (json) => {
    this.context.profileUrl = json.url;
    console.log('Upload: http://localhost:3000'+this.context.profileUrl);
    this.setState(() => ({ toNext: true }));
  }
  toImageFile = (data, fname) => {
    let arr = data.split(',');
    if (!data || data.length <=6) throw Error('Bad image data')
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fname, { type: mime });
  }
  handleClick = (virtue) => {
    let user = this.context;
    user.virtue = virtue;
    let data = this.webcam.getScreenshot();
    if (!data || !data.length) throw Error('no image');

    ///////////////////// TMP: ///////////////////////
    user._id = user._id || Math.random() * 100000000;
    user.name = user.name || 'Barney';
    user.loginType = user.loginType || 'email';
    user.login = user.login || 'Barney' + (+new Date()) + '@aol.com';
    //////////////////////////////////////////////////

    let imgfile = this.toImageFile(data, user._id + '.jpg');
    UserSession.postImage(this.context, imgfile,
      this.handleSuccess,
      e => console.error("Error", e));
  }
  renderRedirect() {
    if (this.state.toNext) {
      return <Redirect to='/data-is' />
    }
  }
  render() {
    const { classes } = this.props;
    const videoConstraints = {
      width: styles.profileImage.width,
      height: styles.profileImage.height,
      facingMode: "user"
    };
    return (
      <div className={classes.root}>
          {this.renderRedirect()}
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h5">Welcome {this.context.name}</Typography>
              <Typography component="h6" variant="h5">What are you searching for today?</Typography>
              <div className='ImageCapture'>
                <Webcam ref={this.setRef}
                  audio={false}
                  screenshotQuality={1}
                  screenshotFormat="image/jpeg"
                  width={styles.profileImage.width}
                  height={styles.profileImage.height}
                  style={{left: '-5000px', position: 'relative'}}
                  videoConstraints={videoConstraints} />
              </div>
              <div>
                  <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('power')}>Power</Button>
                  <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('truth')}>Truth</Button>
                  <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('wealth')}>Wealth</Button>
                  <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('influence')}>Influence</Button>
              </div>
          </div>
          <FooterLogo />
      </div>
    );
  }
}

SearchingFor.propTypes = {
  classes: PropTypes.object.isRequired,
};
SearchingFor.contextType = UserSession;

export default withStyles(styles)(SearchingFor);
