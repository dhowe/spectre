import React from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import UserSession from '../../Components/UserSession/UserSession';

import classes from '../../Components/Video/BgVideo.css';
import HeaderLogo from '../../Icons/headerlogo.svg';
import './TouchToBegin.scss';

import packageJson from '../../../package.json';
global.appVersion = packageJson.version;

// TO REVERT TO IMAGE: use commit d22c24b43f43b

const styles_portrait = {
  root: {
    width: '100%',
    //backgroundImage: `url(${BeginBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 300px',
  },
  clickToContinue: {
    fontSize: '0.5rem'
  }
};

const styles_landscape = {
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundImage: `url(${BeginBackground})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  clickToContinue: {
    fontSize: '0.5rem'
  }
};

// NOTE:  webcam here only to trigger with user-prompt
class TouchToBegin extends React.Component {

  constructor(props) {
    super(props, '/login');
  }

  resize = () => window.location.reload();
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }


  async componentDidMount() {
    window.addEventListener('resize', this.resize);
    UserSession.clear(this.context);
  }

  render() {
    return (
      <div className={this.props.classes.root + ' touchToBegin'}>

        <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
          <source src={`${UserSession.publicUrl}video/SpectreStandby.mp4`} type="video/mp4" />
        </video>

        <div className="touchToBegin-Header">
          <img alt="logo" src={HeaderLogo} />
        </div>

        <Link className="touchToBegin-beginButton" to="/login">
          <Logo />
          <div style={{ position: 'absolute', color: 'white', top: 486, left: 874 }}>
            <p>Touch to Begin!</p>
          </div>
        </Link>

        <div style={{ position: 'absolute', color: 'black', top: 2, left: 15 }}>
          <p style={{ fontSize: 14, color: 'white' }}>{global.appVersion}</p>
        </div>

        <Webcam
          audio={false}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          width={1080}
          height={720}
          style={{ left: '-5000px', position: 'fixed' }}
          videoConstraints={{
            width: 1080,
            height: 720,
            facingMode: "user"
          }}
        />
      </div>
    );
  }
}

TouchToBegin.propTypes = {
  classes: PropTypes.object.isRequired,
};
TouchToBegin.contextType = UserSession;


export default withStyles(window.innerWidth === 1920 ? styles_landscape : styles_portrait)(TouchToBegin);
