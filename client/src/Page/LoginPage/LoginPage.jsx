import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '../../Components/Modal/Modal';
import grey from '@material-ui/core/colors/grey';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import UserSession from '../../Components/UserSession/UserSession';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import Video from '../../Components/Video/Video';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import SpectrePage from '../SpectrePage';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // TMP: #138

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundSize: 'cover',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  marginTop: {
    marginBottom: 75,
  },
  border: {
    borderBottomColor: 'white',
  },
  textField: {
    color: grey[50],
    '&:before': {
      borderColor: grey[50],
    },
  },
  cssLabel: {
    transform: 'translate(0,1.5rem)',
    color: grey[50],
    '&$cssFocused': {
      color: grey[50],
    },
  },
  cssFocused: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssOutlinedInput: {
    // TMP: removed to silence warning in console
    // '&$cssFocused $notchedOutline': {
    //   borderColor: grey[50],
    // }
  },
};


class LoginPage extends SpectrePage {

  constructor(props) {
    super(props, '/pledge');

    this.state = {
      emailErrorCount: 0,
      modalOpen: false,
      clearEmail: true,
      idleCheckerIsDone: false,
      videoStarted: false
    };

    this.video = React.createRef();
    this.modalContent = '';
    this.modalTitle = '';
  }

  handleSubmit = (e, { name, email, gender, clearEmail }) => {

    e && e.preventDefault();

    const user = UserSession.validate(this.context);
    user.lastPageVisit = { page: 'login', time: Date.now() };

    if (!name.length || !gender.length) {
      // see #343: email should be the only possible error case
    }

    if (!this.validEmail(email)) {
      if (this.state.emailErrorCount < 3) {
        this.modalTitle = 'Oops...';
        this.modalContent = 'That doesn\'t look like a valid email address, please try again';
        this.setState({ modalOpen: true, emailErrorCount: this.state.emailErrorCount + 1 });
        clearEmail();
      }
      else {
        // TODO: else return to login page
        this.props.history.push('/login');
      }
    }
    else {
      this.setState({ modalOpen: false });
      this.saveUser(user);
    }
  }

  saveUser = (user) => {

    const handleSuccess = () => {
      console.log('[' + user.lastPageVisit.page.uc() + '] '
        + user.name + ' / ' + user.login + ' / ' + user.gender);
      this.showVideo();
    };

    const handleError = (e) => {
      if (e.error === 'EmailInUse') {
        this.modalTitle = 'Invalid email';
        this.modalContent = 'Email has already been used';
        //this.setState({ modalOpen: true });
      } else {
        console.error('UserSession.create: ', e);
        this.showVideo();
      }
    };

    UserSession.create(user, handleSuccess, handleError);
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  showVideo = () => {
    if (this.video) {
      this.setState({ videoStarted: true });
      this.video && this.video.play();
      this.setState({ idleCheckerIsDone: true });
    }
    else {
      console.error("Unable to load video component");
    }
  }

  termsOfService = () => {
    this.modalTitle = 'Terms of Service';
    this.modalContent = 'Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place';
    this.setState({ modalOpen: true });
  }

  skipVideo = () => { // dev-only
    this.state.videoStarted && this.next();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root + ' LoginPage'}>
        <SpectreHeader />
        <IdleChecker forceTerminate={this.state.idleCheckerIsDone} />
        <div className={classes.content + ' LoginPage-content content'}>
          <Typography style={{ marginBottom: 70 }} component="h2" variant="h2">Let's Play!</Typography>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <Video
            ref={ele => { this.video = ele }}
            movie={"/video/SpectreIntro.mp4"}
            autoPlay={false}
            onComplete={this.next}
            onKeyUp={this.skipVideo}
          />
          <SocialLogin handleSubmit={this.handleSubmit} />
        </div>
        <div onClick={this.termsOfService}><Link className='tos' to='#here'>Terms of Service</Link></div>
      </div>
    );
  }

  validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.length > 0 && re.test(email.toLowerCase());
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

LoginPage.contextType = UserSession;

export default withStyles(styles)(LoginPage);
