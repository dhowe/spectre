import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    console.log('handleSubmit', this.state);
    event.preventDefault();
    this.callBackendAPI()
      .then(res => this.setState({ data: JSON.stringify(res) }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    console.log('callBackendAPI', JSON.stringify(this.state));
    //const response = await fetch('/api');
    const response = await fetch('/api', {
      method: 'get'
      //body: JSON.stringify(this.state)
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    console.log('callBackendAPI ->', body);

    return body;
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
        <p className="Results">{this.state.data}</p>
      </div>

    );
  }
}
