import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logo from "../../Components/Logo/Logo";
import Login from "../../Components/Login/Login";
import { Link } from 'react-router-dom';
import IntroVideo from '../IntroVideo/IntroVideo'
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';

import UserSession from '../../Components/UserSession/UserSession';
import { Redirect } from 'react-router-dom';

import './LoginPage.scss';
import dotEnv from 'dotenv';

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
    currentUser.name = e.target.name.value;
    currentUser.login = e.target.email.value;

    /////////////////////////// TODO: make component /////////////////////////

    // get auth from .env or heroku configs
    dotEnv.config();

    const env = process.env;
    const route = '/api/users/';
    const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
    const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;
    const apiUrl = host + route;

    if (!auth || !auth.length) console.error("Auth required!");

    // define response handlers
    function handleSuccess(json) {
      Object.assign(currentUser, json);
      this.setState(() => ({ toUsername: true }));
    }

    function handleFailure(err) {
      this.setState({ data: JSON.stringify(err.error, null, 2) });
    }

    function handleResponse(response) {
      return response.json()
        .then((json) => {
          if (!response.ok) {
            const error = Object.assign({}, json, {
              status: response.status,
              statusText: response.statusText,
            });
            return Promise.reject(error);
          }
          return json;
        });
    }

    // Do POST to API: '/api/users'; 'https://spectreserver.herokuapp.com/''
    console.log('POST: '+apiUrl);
    fetch(apiUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Basic ' + btoa(auth)
        },
        body: JSON.stringify(currentUser)
      })
      .then(handleResponse.bind(this))
      .then(handleSuccess.bind(this))
      .catch(handleFailure.bind(this));

      /////////////////////////////// End ///////////////////////////////////
  }

  render() {
    if (this.state.toUsername === true) {
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
