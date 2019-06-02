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
  onEmailChange = input => {
    this.setState({ email: input });
    this.context.emailValid = this.validEmail(input);
    this.context.login = input;
  };
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
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  handleShift = () => {
    let layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };
  onKeyPress = button => {
    if (button === "{shift}") {
      this.handleShift();
      this.unShiftNeeded = true;
    } else if (button === "{lock}") {
      this.handleShift();
      this.unShiftNeeded = false;
    } else {
      console.log(`this unshift needed ${this.unShiftNeeded}`)
      if (this.unShiftNeeded) {
        this.setState({
          layoutName: "default"
        });
        this.unShiftNeeded = false;
      }
    }
  };
  constructor(props) {
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.state = { emailValid: false, email: "", layoutName: "default" };
    this.unShiftNeeded = false;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + " socialLogin"}>
        <div className={classes.content + " socialLogin-content"}>
          <form noValidate onSubmit={this.props.handleSubmit}>
          {/* #267: SHIFT / CAPS, etc. dont work */}
          <Keyboard
            ref={r => (this.keyboardRef = r)}
                layout={{
                  default: [
                    "~ 1 2 3 4 5 6 7 8 9 0 - + {delete}",
                    "{tab} q w e r t y u i o p ",
                    "{lock} a s d f g h j k l : ",
                    "{shift} z x c v b n m , . ",
                    ".com @ {space}"
                  ],
                  shift: [
                    "` ! @ # $ % ^ & * ( ) _ + {bksp}",
                    "{tab} Q W E R T Y U I O P ",
                    '{lock} A S D F G H J K L : "',
                    "{shift} Z X C V B N M < >",
                    ".com @ {space}"
                  ]
                }}
                onKeyPress={button => this.onKeyPress(button)}
                layoutName={this.state.layoutName}  
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
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired
};
SocialLogin.contextType = UserSession;

export default withStyles(styles)(SocialLogin);
