import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import UserSession from "../../Components/UserSession/UserSession";
import Keyboard from "react-simple-keyboard";

import grey from "@material-ui/core/colors/grey";
import "react-simple-keyboard/build/css/index.css";
import "./SocialLogin.scss";

const styles = {
  root: {},
  context: {},
  textField: {
    width: 300,
    color: grey[50],
    "&:before": {
      borderColor: grey[50]
    }
  },
  cssLabel: {
    transform: "translate(0,1.5rem)",
    color: grey[50],
    "&$cssFocused": {
      color: grey[50]
    }
  },
  cssFocused: {
    "&:after": {
      borderBottomColor: grey[50]
    }
  },
  cssUnderline: {
    "&:after": {
      borderBottomColor: grey[50]
    }
  },
  cssOutlinedInput: {
    // TMP: removed to silence warning in console
    // '&$cssFocused $notchedOutline': {
    //   borderColor: grey[50],
    // }
  }
};

class SocialLogin extends React.Component {
  onEmailChange(input) {
    this.setState({ email: input });
    this.context.emailValid = this.validEmail(input);
    this.context.login = input;
  }

  handleChange = login => event => {
    let input = event.target.value;
    this.setState(
      {
        email: input
      },
      () => {
        this.keyboardRef.keyboard.setInput(input);
      }
    );
    this.context.emailValid = this.validEmail(input);
    this.context.login = event.target.value; // user-prop
  };

  validEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  constructor(props) {
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.state = { emailValid: false, email: "" };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + " socialLogin"}>
        <div className={classes.content + " socialLogin-content"}>
          <form noValidate onSubmit={this.props.handleSubmit}>
            <FormControl className={classes.margin}>
              <InputLabel
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
              >
                Email
              </InputLabel>
              <Keyboard
                ref={r => (this.keyboardRef = r)}
                onChange={input => this.onEmailChange(input)}
              />
              <Input
                name="email"
                id="custom-css-standard-input"
                value={this.state.email}
                onChange={this.handleChange("name")}
                classes={{
                  root: classes.textField,
                  underline: classes.cssUnderline
                }}
              />
              <br />
            </FormControl>
          </form>
        </div>
      </div>
    );
  }

  newMethod() {
    return this;
  }
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired
};
SocialLogin.contextType = UserSession;

export default withStyles(styles)(SocialLogin);
