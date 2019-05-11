import React, { Component } from "react";
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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {

    console.log('handleSubmit');

    event.preventDefault();

    dotEnv.config();

    const login = this;
    const env = process.env;
    console.log("ENV", env);
    const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;
    console.log('AUTH', auth);

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

    let apiUrl = 'https://spectreserver.herokuapp.com/api/users/';
    if (false) apiUrl = '/api/users';

    fetch(apiUrl, {
        method: "post",
        cache: "no-store", // ?
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Basic ' + btoa(auth)
        },
        body: JSON.stringify(this.state)
      })
      .then(handleResponse)
      .then(js => login.setState({ data: JSON.stringify(js, null, 2) }))
      .catch(e => this.setState({ data: JSON.stringify(e.error, null, 2) }));
  }

  render() {
    return (
      <div className={this.props.classes.root + " LoginPage"}>
          <SpectreHeader />
          <div className={this.props.classes.content + " LoginPage-content"}>
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

export default withStyles(styles)(LoginPage);
