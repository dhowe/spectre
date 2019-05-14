import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logo from "../../Components/Logo/Logo";
import { Link, Redirect} from 'react-router-dom';
import IntroVideo from '../IntroVideo/IntroVideo'
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import UserSession from '../../Components/UserSession/UserSession';

import './LoginPage.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundSize: 'cover',
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { toUsername: false };
  }
  handleSubmit(e) {
    e.preventDefault();

    // get user from current context
    let currentUser = this.context;

    // assign the form properties
    currentUser.loginType = 'email';
    if (e.target.hasOwnProperty('email')) {
      currentUser.login = e.target.email.value;
    }

    let handleSuccess = json => {
      Object.assign(currentUser, json);
      this.setState(() => ({ toUsername: true }));
      console.log('User:',currentUser);
    }

    let handleError = e => {
      console.error(e.error);
      this.setState({ data: JSON.stringify(e.error, null, 2) });
    }

    UserSession.createUser(currentUser, handleSuccess, handleError);
  }
  render() {
    if (this.state.toUsername === true) { // hack redirect
      return <Redirect to='/username' />
    }
    return (
      <div className={this.props.classes.root + " LoginPage"}>
          <SpectreHeader />
          <div className={this.props.classes.content + " LoginPage-content content"}>
              <Logo></Logo>
              <Typography component="h1" variant="h1">Hello</Typography>
              <Typography component="h2" variant="h2">Let's Play!</Typography>
              <SocialLogin handleSubmit={ this.handleSubmit }/>
              <Link component={IntroVideo} to="/intro-video">
                  <IconButton colour="white" icon="next" text="Next" />
              </Link>
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
