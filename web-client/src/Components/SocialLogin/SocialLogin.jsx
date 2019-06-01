import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import UserSession from "../../Components/UserSession/UserSession";
import Keyboard from "react-simple-keyboard";
//import InputLabel from "@material-ui/core/InputLabel";
import grey from "@material-ui/core/colors/grey";
import "react-simple-keyboard/build/css/index.css";
import "./SocialLogin.scss";

const styles = {
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
  handleChange = login => event => {
    this.context.login = event.target.value; // user-prop
  };
  onEmailChange = input => {
    this.context.login = input;
    document.getElementsByName("email")[0].value = input;
  };
  /* TODO: validate email here */
  validEmail = email => {
    var re = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + " socialLogin"}>
        <div className={classes.content + " socialLogin-content"}>
          <form onSubmit={this.props.handleSubmit}>
          <Keyboard
                layout={{
                  default: [
                    "1 2 3 4 5 6 7 8 9 0 - {bksp}",
                    "q w e r t y u i o p",
                    "a s d f g h j k l",
                    "z x c v b n m .",
                    ".com @ {space}"
                  ],
                  shift: [
                    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                    "{tab} Q W E R T Y U I O P { } |",
                    '{lock} A S D F G H J K L : " {enter}',
                    "{shift} Z X C V B N M < > ? {shift}",
                    ".com @ {space}"
                  ]
                }}
                onChange={input => this.onEmailChange(input)}
              />
            <FormControl className={classes.margin}>
              {/* <InputLabel
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}>
                Email
              </InputLabel> */}
              <Input
                name="email"
                id="custom-css-standard-input"
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
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired
};
SocialLogin.contextType = UserSession;

export default withStyles(styles)(SocialLogin);
