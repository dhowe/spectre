import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import dotEnv from 'dotenv';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      loginType: "twitter",
      password: ""
    };
  }

  validateForm() {
    return this.state.login.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value });
  }

  handleSubmit = event => {

    event.preventDefault();

    dotEnv.config();

    const login = this;
    const env = process.env;
    const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;

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


    fetch('/api/users', {
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
      <div className = "Login">
        <Form onSubmit = { this.handleSubmit }>
          <Form.Group controlId="login" bsSize="large">
            <Form.Control autoFocus type = "email" value={ this.state.login } onChange = { this.handleChange }/>
          </Form.Group>
          <Form.Group controlId="password" bsSize = "large">
            <Form.Control value={ this.state.password } onChange={ this.handleChange } type="password"/>
          </Form.Group>
          <Button block bsSize="large" disabled={!this.validateForm() } type="submit">
          Login
          </Button>
        </Form >
        <p className="Results"><pre>{ this.state.data }</pre></p>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
