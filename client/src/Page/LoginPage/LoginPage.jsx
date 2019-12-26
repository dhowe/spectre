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


class LoginPage extends React.Component {

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
    this.social = React.createRef();
    this.modalContent = '';
    this.modalTitle = '';
  }

  stubbedSubmit = () => { // for dev-only
    let cons = "bcdfghjklmnprstvxz", vows = "aeiou";
    let name = cons[Math.floor(Math.random() * cons.length)]
      + vows[Math.floor(Math.random() * vows.length)]
      + cons[Math.floor(Math.random() * cons.length)];
    let data = {
      name: name.ucf(),
      email: name + (+new Date()) + '@test.com',
      gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)]
    };
    console.log('[STUB] ' + data.name + " / " + data.email + " / " + data.gender);
    this.setState(data); // update form and submit
    this.timeout = setTimeout(() => this.handleSubmit(0, this.state), 1500);
  }

  handleSubmit = (e, { name, email, gender, clearEmail }) => {

    e && e.preventDefault();

    if (!name.length || !gender.length) throw Error('invalid state')
    // see #343: incorrect email should be the only possible error case

    this.social.setState({ name, email, gender });

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
      const user = this.context; // no validate needed
      user.name = name;
      user.login = email;
      user.gender = gender;
      user.lastPageVisit = { page: 'login', time: Date.now() };

      this.setState({ modalOpen: false });
      this.saveUser(user);
    }
  }

  saveUser = (user) => {
    const handleSuccess = () => {
      UserSession.log(user);
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
      this.video.play();
      this.setState({ idleCheckerIsDone: true });
    }
    else {
      console.error("Unable to load video component");
      this.props.history.push('/pledge');
    }
  }

  termsOfService = () => {
    this.modalTitle = 'Terms of Service';
    this.modalContent = 'Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place. Brungard told the court he was drunk when the incident took place';
    this.setState({ modalOpen: true });
  }

  endVideo = () => { // dev-only
    if (this.state.videoStarted) {
      this.props.history.push('/pledge');
    }
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
            onComplete={this.endVideo}
            onKeyUp={this.endVideo}
          />
          <SocialLogin
            ref={ele => { this.social = ele }}
            handleSubmit={this.handleSubmit} />
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
