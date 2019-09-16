import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
//import Webcam from "react-webcam";
import './SearchingFor.scss';
import Styles from '../../Styles';
import NavigationHack from '../NavigationHack';
import Modal from '../../Components/Modal/Modal';


const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  content: {
    paddingTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  button: {
    ...Styles.button,
  },
  link: {
    display: 'block',
    marginBottom: '30px',
  },
  profileImage: {
    width: 800,
    height: 1000,
  },
};

class SearchingFor extends NavigationHack {
  constructor(props) {
    super(props, 'data-is');

    this.setRef = this.setRef.bind(this);
    this.state = {
      //modal
      modalOpen: false,
      //timout checker
      idleTimer : 0,
      resetTimer : 5,
      isIdle : false,
    }
    //modal
    this.modalContent = '';
    this.modalTitle = '';
    //timout checker
    this.handleIdle = this.handleIdle.bind(this);
    this.handleClickTimer = this.handleClickTimer.bind(this);
    this.interval = '';
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  componentDidMount() {
    this.interval = setInterval(this.handleIdle, 1000);
  }

  handleIdle(){

    let timer = this.state.idleTimer;
    console.log(timer);
    if(timer > 10 ){
      this.state.isIdle = true;
    }else{
      this.state.idleTimer = this.state.idleTimer + 1;
    }
    if(this.state.isIdle){
      this.modalTitle = this.state.resetTimer + '';
      this.modalContent = 'Are you still here?';
      this.setState({ modalOpen: true });
      this.state.resetTimer -= 1;
    }
    if(this.state.resetTimer<=-1){
        window.open("/", "_self");
    }
  }

  handleClickTimer(e) {
    if (e) {
      this.state.idleTimer = 0;
      this.state.isIdle = false;
      this.state.resetTimer = 5;
      if(this.modalContent.includes('Are you still here?') && this.state.modalOpen){
        this.closeModal();
      }
    }
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  toImageFile(data, fname) {
    const arr = data.split(',');
    if (!data || data.length <= 6) {
      throw Error('Bad image data');
    }
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fname, { type: mime });
  }


  handleClick(virtue) {
    const user = this.context;
    user.virtue = virtue;
    user.lastPageVisit = { page: '/SearchingFor', time: Date.now()};

    ///////////////////// TMP: ///////////////////////
    user._id = user._id || Math.random() * 100000000;
    user.name = user.name || 'Barney';
    user.loginType = user.loginType || 'email';
    user.login = user.login || `Barney${+new Date()}@aol.com`;

    // here we are doing the webcam capture, disabled for now
    if (false) {
      const data = this.webcam.getScreenshot();
      if (data && data.length) {
        const imgfile = this.toImageFile(data, user._id + '.jpg');
        UserSession.postImage(this.context, imgfile,
          (json) => {
            console.log(`Upload: http://localhost:3000${json.url}`);
            this.context.hasImage = true;
          },
          (e) => {
            console.error('Error', e);
            this.context.hasImage = false;
          },
        );
        this.setState(() => ({ toNext: true }));
      }
      else {
        console.error('no image capture');
      }
    }
    clearInterval(this.interval);
    this.next();
  }

  render() {
    const { classes } = this.props;
    /*const videoConstraints = {
      width: styles.profileImage.width,
      height: styles.profileImage.height,
      facingMode: "user"
    };*/
    return (
      <div className={classes.root} onClick={this.handleClickTimer}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <Typography className="username" component="h3" variant="h3">{this.context.name || 'Barney'}</Typography>
          <Typography className="question" component="h3" variant="h3">What are you searching for today?</Typography>
          <div className="ImageCapture">
            {/*<Webcam ref={this.setRef}
                  audio={false}
                  screenshotQuality={1}
                  screenshotFormat="image/jpeg"
                  width={styles.profileImage.width}
                  height={styles.profileImage.height}
                  style={{left: '-5000px', position: 'relative'}}
                  videoConstraints={videoConstraints} />*/}
          </div>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <div className="buttonWrapper">
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('power')}>Power</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('truth')}>Truth</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('influence')}>Influence</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('wealth')}>Wealth</Button>
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
