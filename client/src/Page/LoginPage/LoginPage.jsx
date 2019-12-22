import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '../../Components/Modal/Modal';
import grey from '@material-ui/core/colors/grey';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import UserSession from '../../Components/UserSession/UserSession';

import './LoginPage.scss';
import Video from '../../Components/Video/Video';
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
      nameErrorCount: 0,
      modalOpen: false,
      clearEmail: true,
      videoStarted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.skipVideo = this.skipVideo.bind(this);
    this.modalContent = '';
    this.modalTitle = '';
  }

  componentDidMount() {
    UserSession.init(() => { }, (e) => {
      console.error('[DB]', e);
      UserSession.nodb = true;
      UserSession.defaultUsers((users) => {
        this.context.similars = users;
        console.log('No DB: loaded default users', this.context.similars);
      });
    });
  }

  handleSubmit(e, { name, email, gender, clearEmail }) {

    e && e.preventDefault();

    const user = UserSession.get(this.context);
    user.lastPageVisit = { page: 'login', time: Date.now() };

    const { emailErrorCount, nameErrorCount } = this.state;
    const emailIsValid = LoginPage.validEmail(email);
    const nameIsValid = name.length;

    // see #343
    //const genderIsValid = typeof user.gender !== 'undefined';

    if (nameIsValid && emailIsValid) {

      user.loginType = 'email'; // TMP:
      user.login = email;
      user.name = name.ucf();
      user.gender = gender;

      const handleSuccess = () => {
        console.log('[' + user.lastPageVisit.page.uc() + '] '
          + user.name + ' / ' + user.login + ' / ' + user.gender);
        this.showVideo();
      };

      const handleError = (e) => {
        if (e.error === 'EmailInUse') {
          this.modalTitle = 'Invalid email';
          this.modalContent = 'Email has already been used';
          this.setState({ modalOpen: true });
        } else {
          console.error('UserSession.create: ', e);
          this.showVideo();
        }
      };

      UserSession.create(user, handleSuccess, handleError);

    } else if (!nameIsValid && nameErrorCount < 3) {

      this.modalTitle = 'Oops...';
      this.modalContent = 'You need to enter a name, please try again';
      this.setState({ modalOpen: true, nameErrorCount: nameErrorCount + 1 });

    } else if (!emailIsValid && emailErrorCount < 3) {

      this.modalTitle = 'Oops...';
      this.modalContent = 'That doesn\'t look like a valid email address, please try again';
      this.setState({ modalOpen: true, emailErrorCount: emailErrorCount + 1 });
      clearEmail();

    } else {

      // TODO: TMP: should reject without successful User creation
      this.context.login = email;
      this.context.name = name; // user-prop
      this.showVideo();
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  showVideo() {
    this.setState({ videoStarted: true });
    this.video.play();
  }

  skipVideo() { // dev-only
    this.state.videoStarted && this.next();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + ' LoginPage'}>
        <SpectreHeader />
        <div className={classes.content + ' LoginPage-content content'}>
          <Typography style={{ marginBottom: 70 }} component="h2" variant="h2">Let's Play!</Typography>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <Video
            ref={(el) => { this.video = el; }}
            movie="/video/SpectreIntro.mp4"
            autoPlay={false}
            onComplete={this.next}
            onKeyUp={this.skipVideo}
          />
          <SocialLogin handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }

  static validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.length > 0 && re.test(email.toLowerCase());
  }

  static validName(name) {
    return name.length > 0;
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

LoginPage.contextType = UserSession;

export default withStyles(styles)(LoginPage);
