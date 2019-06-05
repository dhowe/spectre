import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import UserSession from '../../Components/UserSession/UserSession';
import Keyboard from 'react-simple-keyboard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import grey from '@material-ui/core/colors/grey';
import 'react-simple-keyboard/build/css/index.css';
import './SocialLogin.scss';

const styles = {
  formControl: {
    marginBottom: 75,
  },
  textField: {
    position: 'static',
    color: grey[50],
    '&:before': {
      borderColor: grey[50],
    },
  },
  cssLabel: {
    transform: 'translate(0,1.5rem)',
    color: grey[50],
    '&$cssFocused': {
      color: grey[50],
    },
  },
  cssFocused: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  margin: {
    display: 'block',
    marginBottom: 75,
  },
  radioGroup: {
    alignItems: 'center'
  },
  cssOutlinedInput: {
    // TMP: removed to silence warning in console
    // '&$cssFocused $notchedOutline': {
    //   borderColor: grey[50],
    // }
  },
};

class SocialLogin extends React.Component {
  onTextChange = (callback) => {
    return input => {
      callback && callback(input);
    };
  };

  onEmailChange(input) {
    this.context.emailValid = this.validEmail(input);
    this.context.login = input;
    console.log(JSON.stringify(this.context));
  }

  validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email)
      .toLowerCase());
  }

  handleShift() {
    const { layoutName } = this.state;
    this.setState({
      layoutName: layoutName === 'default' ? 'shift' : 'default',
    });
  }

  onKeyPress(button) {
    if(button === '{shift}') {
      this.handleShift();
      this.unShiftNeeded = true;
    } else if(button === '{lock}') {
      this.handleShift();
      this.unShiftNeeded = false;
    } if(button === '{delete}') {
      const { focus } = this.state;
      const input = this.state[focus];

      this.setState({
        [focus]: (input.substr(0, input.length - 1))
      });
    } else if(!(button.startsWith('{') || button.endsWith('}'))) {
      const { focus } = this.state;
      const text = this.state[focus];

      this.setState({
        [focus]: text.concat(button),
      });
    } else {
      if (this.unShiftNeeded) {
        this.setState({
          layoutName: 'default',
        });
        this.unShiftNeeded = false;
      }
    }
  };

  changeFocus(focus) {
    return () => this.setState({ focus });
  }

  constructor(props) {
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.validEmail = this.validEmail.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.state = { emailValid: false, email: '', name: '', focus: 'name', layoutName: 'default' };
    this.unShiftNeeded = false;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} socialLogin`}>
        <div className={`${classes.content} socialLogin-content`}>
          <form noValidate onSubmit={this.props.handleSubmit}>
            {/* #267: SHIFT / CAPS, etc. dont work */}
            <FormControl className={classes.margin}>

              <Typography component="h6" variant="h6">Enter your name:</Typography>
              <Input
                onClick={this.changeFocus('name')}
                name="name"
                id="custom-css-standard-input"
                value={this.state.name}
                onChange={this.onTextChange(this.onEmailChange)}
                classes={{
                  root: classes.textField,
                  underline: classes.cssUnderline,
                }}
              />
            </FormControl>
            <FormControl className={classes.margin}>

              <Typography component="h6" variant="h6">Your email:</Typography>

              <Input
                onClick={this.changeFocus('email')}
                name="email"
                id="custom-css-standard-input"
                value={this.state.email}
                onChange={this.onTextChange(input => this.context.username = input)}
                classes={{
                  root: classes.textField,
                  underline: classes.cssUnderline,
                }}
              />
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
              <Typography component="h6" variant="h6">Your gender:</Typography>

              <RadioGroup
                aria-label="Gender"
                name="gender"
                value={this.state.value}
                onChange={this.handleRadioChange}
                className={classes.radioGroup}
              >
                <FormControlLabel className={'radio'} value="female" control={<Radio color='primary' />} label="Woman" />
                <FormControlLabel className={'radio'} value="male" control={<Radio color='primary' />} label="Man" />
                <FormControlLabel className={'radio'} value="other" control={<Radio color='primary' />} label="Other" />
              </RadioGroup>
            </FormControl>
            <Keyboard
              ref={(r) => { this.keyboardRef = r; }}
              layout={{
                default: [
                  '~ 1 2 3 4 5 6 7 8 9 0 - + {delete}',
                  '{tab} q w e r t y u i o p ',
                  '{lock} a s d f g h j k l : ',
                  '{shift} z x c v b n m , . ',
                  '.com @ {space}',
                ],
                shift: [
                  '` ! @ # $ % ^ & * ( ) _ + {delete}',
                  '{tab} Q W E R T Y U I O P ',
                  '{lock} A S D F G H J K L : "',
                  '{shift} Z X C V B N M < >',
                  '.com @ {space}',
                ],
              }}
              onKeyPress={button => this.onKeyPress(button)}
              layoutName={this.state.layoutName}
            />
          </form>
        </div>
      </div>
    );
  }
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
SocialLogin.contextType = UserSession;

export default withStyles(styles)(SocialLogin);
