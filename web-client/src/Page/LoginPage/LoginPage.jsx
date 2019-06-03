import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import UserSession from '../../Components/UserSession/UserSession';

import './LoginPage.scss';
import Video from '../../Components/Video/Video';

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
};

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { toNext: false, modalOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.continue = this.continue.bind(this);
    this.modalContent = '';
    this.modalTitle = '';
    this.refs = {};
  }

  handleSubmit(e) {
    e.preventDefault();

    // get user from current context
    let user = this.context;
    user.lastPageVisit = { page: '/Login', time: Date.now() };
    user.loginType = 'email'; // TMP:

    if(user.login && user.emailValid) {
      let handleSuccess = json => {
        Object.assign(user, json);
        this.showVideo();
        console.log('User:', user);
      };

      let handleError = e => {
        if(e.error === 'EmailInUse') {
          this.modalTitle = 'Invalid email';
          this.modalContent = 'Email has already been used';
          this.setState({ modalOpen: true });
        } else {
          console.error(e);
          this.showVideo();
        }
        //this.setState({ data: JSON.stringify(e.error, null, 2) });
      };
      UserSession.createUser(user, handleSuccess, handleError);

    } else if(user.login && !user.emailValid) {

      this.modalTitle = 'Oops...';
      this.modalContent = 'We couldn\'t find that email, please try again';
      this.setState({ modalOpen: true });

    } else {

      // TMP: should reject without successful User creation
      this.context.login = `test${+new Date()}@test.com`;
      this.showVideo();
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  renderRedirect() {
    if(this.state.toNext) {
      return <Redirect to="/username" />;
    }
  }

  showVideo() {
    this.video.play();
  }

  continue() {
    this.setState(() => ({ toNext: true }));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + ' LoginPage'}>
        {this.renderRedirect()}
        <SpectreHeader/>
        <div className={classes.content + ' LoginPage-content content'}>
          <Typography component="h1" variant="h1">Hello</Typography>
          <Typography component="h2" variant="h2">Let's Play!</Typography>
          <Typography component="h6" variant="h6">Enter Email</Typography>
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
            onComplete={this.continue}
          />
          <SocialLogin />
          <IconButton onClick={this.handleSubmit} colour="white" icon="next" text="Next"/>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

LoginPage.contextType = UserSession;

export default withStyles(styles)(LoginPage);
