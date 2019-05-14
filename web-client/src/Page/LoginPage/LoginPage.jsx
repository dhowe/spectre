import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logo from "../../Components/Logo/Logo";
import { Link, Redirect } from 'react-router-dom';
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
    this.state = { toNext: false };
  }

  handleSubmit(e) {
    e.preventDefault();

    // get user from current context
    let user = this.context;
    user.loginType = 'email'; // TMP:

    console.log(user);

    if (user.login) {

      let handleSuccess = json => {
        Object.assign(user, json);
        this.setState(() => ({ toNext: true }));
        console.log('User:', user);
      }

      let handleError = e => {
        console.error(e.error);
        this.setState({ data: JSON.stringify(e.error, null, 2) });
      }

      UserSession.createUser(user, handleSuccess, handleError);

    } else {

      // TMP: should reject without successful User creation
      this.context.login = 'test'+(+new Date())+'@test.com';
      this.setState(() => ({ toNext: true }));
    }
  }
  renderRedirect() {
    if (this.state.toNext) {
      return <Redirect to='/username' />
    }
  }
  render() {
    return (
      <div className={this.props.classes.root + " LoginPage"}>
          {this.renderRedirect()}
          <SpectreHeader />
          <div className={this.props.classes.content + " LoginPage-content content"}>
              <Logo></Logo>
              <Typography component="h1" variant="h1">Hello</Typography>
              <Typography component="h2" variant="h2">Let's Play!</Typography>
              <SocialLogin/>
              <Link component={IntroVideo} to='' onClick={ this.handleSubmit }>
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
