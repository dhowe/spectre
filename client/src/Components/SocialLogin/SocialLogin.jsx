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

import IconButton from '../../Components/IconButton/IconButton';
import './SocialLogin.scss';

const styles = {
  formControl: {
    marginBottom: 75,
  },
  textField: {
    position: 'static',
    width: '100%',
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
    alignItems: 'center',
  },
  cssOutlinedInput: {
    // TMP: removed to silence warning in console
    // '&$cssFocused $notchedOutline': {
    //   borderColor: grey[50],
    // }
  },
};

const RIGHT_ARROW = 39;

class SocialLogin extends React.Component {

  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.clearEmail = this.clearEmail.bind(this);
    this.state = {
      userStubbed: false,
      emailValid: false,
      email: '',
      name: '',
      gender: '',
      focus: 'name',
      layoutName: 'default',
      clearEmail: this.clearEmail,
    };
    this.unShiftNeeded = false;
    this.fakedUser = false;
    this.form = React.createRef();
    this.stubbedSubmit = this.stubbedSubmit.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keyup", this.stubbedSubmit, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.stubbedSubmit, false);
  }
  stubbedSubmit(event) { // dev-only
    if (event.keyCode === RIGHT_ARROW && !this.fakedUser ) {
      this.fakedUser = true;
      console.log('Creating stubbed user');
      let cons = "bcdfghjklmnprstvxz", vows = "aeiou";
      let name = cons[Math.floor(Math.random()*cons.length)]
        + vows[Math.floor(Math.random()*vows.length)]
        + cons[Math.floor(Math.random()*cons.length)];
      let data = {
        name: name.ucf(),
        email: name + (+new Date()) + '@test.com',
        gender: ['male', 'female','other'][Math.floor(Math.random()*3)]
      };
      this.setState(data); // update form and submit
      setTimeout(() => this.props.handleSubmit(0, this.state), 1000);
    }
  }
  onKeyPress(button) {

    if (button === '{shift}') {
      this.handleShift();
      this.unShiftNeeded = !this.unShiftNeeded;

    } else if (button === '{lock}') {
      this.handleShift();
      this.unShiftNeeded = false;

    } else if (button === '{delete}') {
      const { focus } = this.state;
      const input = this.state[focus];

      this.setState({
        [focus]: (input.substr(0, input.length - 1))
      });

    } else if (!(button.startsWith('{') || button.endsWith('}'))) {
      const { focus } = this.state;
      const text = this.state[focus];

      this.setState({
        [focus]: text.concat(button),
      });

      if (this.unShiftNeeded) {
        this.handleShift();
        this.unShiftNeeded = false;
      }
    }
  }

  handleShift() {
    const { layoutName } = this.state;
    this.setState({
      layoutName: layoutName === 'default' ? 'shift' : 'default',
    });
  }

  handleRadioChange(event) {
    this.context.gender = event.target.value; // user-prop
    this.setState({ gender: event.target.value });
  }

  changeFocus(focus) {
    return () => this.setState({ focus });
  }

  clearEmail() {
    this.setState({ email: '' });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} socialLogin`}>
        <div className={`${classes.content} socialLogin-content`}>
          <form noValidate>
            {/* #267: SHIFT / CAPS, etc. dont work */}

            <FormControl className={classes.margin}>
              <Typography component="h6" variant="h6">Enter your name:</Typography>
              <Input
                name="name"
                onClick={this.changeFocus('name')}
                id="custom-css-standard-name"
                value={this.state.name}
                classes={{
                  root: classes.textField,
                  underline: classes.cssUnderline,
                }}
              />
            </FormControl>

            <FormControl className={classes.margin}>
              <Typography component="h6" variant="h6">Your email:</Typography>
              <Input
                name="email"
                onClick={this.changeFocus('email')}
                id="custom-css-standard-email"
                value={this.state.email}
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
                value={this.state.gender}
                onChange={this.handleRadioChange}
                className={classes.radioGroup}>
                <FormControlLabel className="radio" value="female" control={<Radio color="primary" />} label="Woman" />
                <FormControlLabel className="radio" value="male" control={<Radio color="primary" />} label="Man" />
                <FormControlLabel className="radio" value="other" control={<Radio color="primary" />} label="Other" />
              </RadioGroup>
            </FormControl>
            <Keyboard
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
            <IconButton onClick={e => this.props.handleSubmit(e, this.state)} enabled="white" colour="white" icon="next" text="Next" />
          </form>
        </div>
      </div>
    );
  }
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
SocialLogin.contextType = UserSession;

export default withStyles(styles)(SocialLogin);
