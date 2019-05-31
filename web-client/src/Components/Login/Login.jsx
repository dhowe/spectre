import React from 'react';
import LoginRegister from 'react-mui-login-register';

const classes = {
  root: {
    flexGrow: 1,
    width: "100%",
    textAlign: "center",
  },
  Login_image: {
    position: 'relative',
  }
};

class Login extends React.Component {
  // const { classes } = props;
  handleLogin = content => {
    alert(`Logging in with content '${JSON.stringify(content)}'`);
  };

  handleLoginWithProvider = providerId => {
    alert(`Logging in with provider '${providerId}'`);
  };

  handleRegister = content => {
    alert(`Registering with content '${JSON.stringify(content)}'`);
  };

  handleRegisterWithProvider = providerId => {
    alert(`Registering with provider '${providerId}'`);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <LoginRegister
              onLogin={this.handleLogin}
              onLoginWithProvider={this.handleLoginWithProvider}
          />
      </div >
    )
  }
}
export default (Login);
