import React from 'react';
import PropTypes from 'prop-types';
//import Typography from '@material-ui/core/Typography';
import Modal from '../../Components/Modal/Modal';
import TOSModal from '../../Components/TOSModal/TOSModal';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import { Link } from 'react-router-dom';
import Video from '../../Components/Video/Video';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import TosSummary from './tosSummary'
import Tos from './Tos'

import { withStyles } from '@material-ui/core/styles';
import './LoginPage.scss';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // TMP: #138

const styles_landscape = {

};

const styles_portrait = {
  marginBottom: 70,
};

class LoginPage extends React.Component {

  constructor(props) {
    super(props, '/pledge');
    this.state = {
      height: props.height,
      emailErrorCount: 0,
      modalOpen: false,
      tosModalOpen: false,
      idleCheckerDone: false,
    };
    this.videoStarted = false;
    this.video = React.createRef();
    this.social = React.createRef();
    this.modalContent = '';
    this.modalTitle = '';
    this.tosModalSummary = '';
    this.tosModalContent = '';
    this.tosModalTitle = '';
  }

  componentDidMount() {
    UserSession.clear();
    this.setState({ height: window.innerHeight + 'px' });
  }

  handleSubmit = (e, { name, email, gender }) => {

    if (e) e.preventDefault();

    const user = this.context;

    if (!e) { // right-arrow key
      UserSession.validate(this.context, ['name', 'login', 'gender']);
      name = user.name;
      email = user.login;
      gender = user.gender;
      console.log("[STUB]", name, email, gender);
    }
        
    if (typeof gender === 'undefined') {
      if (!this.emailIsValid(email)) {
        if (this.state.emailErrorCount < 3) {
          this.modalTitle = 'Oops...';
          this.modalContent = 'That doesn\'t look like a valid email address, please try again';
          this.setState({ modalOpen: true, emailErrorCount: this.state.emailErrorCount + 1 });
        }
        else {
          // else return to login page
          this.props.history.push('/login');
        }
      }
    }
    else {
      this.social.setState({ name, email, gender });
      user.name = name;
      user.login = email;
      user.gender = gender;
      user.lastPageVisit = { page: 'login', time: Date.now() };
      this.setState({ modalOpen: false });
      this.saveUser(user);
    }
  }

  // save user then start video
  saveUser = async (user) => {
    try {
      UserSession.create(user);
      console.log('[LOGIN] ' + user.toString());
    }
    catch (e) {
      if (e.error === 'EmailInUse') {
        this.modalTitle = 'Invalid email';
        this.modalContent = 'Email has already been used';
        //this.setState({ modalOpen: true });
      } else {
        console.error('UserSession.create: ', e);
      }
    }
    this.showVideo();
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  closeTosModal = () => {
    this.setState({ tosModalOpen: false });
  }

  showVideo = () => {
    if (this.video) {
      this.videoStarted = true;
      this.video.play();
      this.setState({ idleCheckerDone: true });
    }
    else {
      console.error("Unable to load video component");
      this.props.history.push('/pledge');
    }
  }

  termsOfService = () => {
    this.tosModalTitle = 'Terms of Service';
    this.tosModalSummary = TosSummary.text;
    this.tosModalContent = '';
    this.setState({ tosModalOpen: true });
  }

  onKeyPress = (e) => {
    if (e.key === 'ArrowRight') {
      if (this.videoStarted) { // next-page
        this.props.history.push('/pledge');
      }
      else {
        this.handleSubmit(false, {}); // dev only: use mock data
      }
    }
    else if (e.key === 'ArrowLeft') {
      this.props.history.push(this.videoStarted ? '/login' : '/');
    }
  }

  endVideo = () => { // to next page
    if (this.videoStarted) this.props.history.push('/pledge');
  }

  emailIsValid = (addr) => {
    return addr && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(addr.toLowerCase());
  }

  render() {

    return (
      <div className={this.props.classes.root + ' LoginPage'}>
        <SpectreHeader colour="white" />
        <IdleChecker forceTerminate={this.state.idleCheckerDone} />
        <div className={this.props.classes.content + ' LoginPage-content content'}>
          <h1 className="login-title">Let's play!</h1>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <TOSModal
            isOpen={this.state.tosModalOpen}
            title={this.tosModalTitle}
            summary={this.tosModalSummary}
            content={<Tos />}
            onClose={() => this.closeTosModal()}
          />
          <Video
            ref={ele => { this.video = ele }}
            movie="https://spectreknows.me/video/SpectreIntro.mp4"
            autoPlay={false}
            onComplete={this.endVideo}
            onKeyUp={this.onKeyPress}
          />
          <SocialLogin
            ref={ele => { this.social = ele }}
            handleSubmit={this.handleSubmit} />
        </div>
        <div onClick={this.termsOfService}><Link className='tos' to='#here'>Terms of Service</Link></div>
        <FooterLogo />
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.string
};

LoginPage.contextType = UserSession;

LoginPage.defaultProps = {
  height: '500px'
};

export default withStyles(window.innerWidth === 1920 ? styles_landscape : styles_portrait)(LoginPage);
