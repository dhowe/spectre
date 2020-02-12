import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
//import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import UserSession from '../../Components/UserSession/UserSession';
import Keyboard from 'react-simple-keyboard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'react-simple-keyboard/build/css/index.css';
import IconButton from '../../Components/IconButton/IconButton';
import './SocialLogin.scss';
import ComponentsStyles from '../../App.module.css';


const styles_landscape = {
  fontSize: '1rem',
  fontWeight: 400,
  formControl: {
    marginBottom: 15,
  },
  margin: {
    display: 'block',
  },
};

const styles_portrait = {
  fontSize: '1.25rem',
  fontWeight: 400,
  formControl: {
    marginBottom: 75,
  },
  margin: {
    display: 'block',
    marginBottom: 75,
  },
};

let stateObj = {
  emailValid: false,
  email: '',
  name: '',
  gender: '',
  focus: 'name',
  layoutName: 'default'
  //clearEmail: this.clearEmail,
};

class SocialLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = stateObj;
    this.unShiftNeeded = false;
    this.onKeyPress = this.onKeyPress.bind(this);
    this.shiftCheck = this.shiftCheck.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.clearEmail = this.clearEmail.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.state = {
      emailValid: false,
      email: '',
      name: '',
      focus: 'name',
      layoutName: 'shift',
      input: "",
      clearEmail: this.clearEmail,
      pageDone: false,
      pageOne: { display: 'block' },
      pageTwo: { display: 'none' },
    };
    this.unShiftNeeded = true;
    this.form = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("keyup", this.stubbedSubmit, false);
    document.addEventListener('click', this.shiftCheck);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.shiftCheck);
    document.removeEventListener("keyup", this.stubbedSubmit, false);
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

      this.setState({ [focus]: text.concat(button) });

      if (this.unShiftNeeded) {
        this.handleShift();
        this.unShiftNeeded = false;
      }
    }
  }

  shiftCheck() {
    if (this.state.focus === "name" && !this.state.name.length) {
      this.setState({ layoutName: 'shift' });
      this.unShiftNeeded = true;
    }
  }

  handleShift() {
    this.setState({
      layoutName: this.state.layoutName === 'default' ? 'shift' : 'default'
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

  handleNextPage(e) {
    e.preventDefault();

    this.props.handleSubmit(e, this.state)

    if (this.emailIsValid(this.state.email)) {
      this.setState({ pageOne: { display: 'none' } })
      this.setState({ pageTwo: { display: 'block' } })
    }
  }

  emailIsValid = (addr) => {
    return addr && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(addr.toLowerCase());
  }

  render() {
    const { classes } = this.props;
    const { email, name, gender } = this.state;
    const btnEnabledPg1 = email && email.length &&
      name && name.length;
    const btnEnabledPg2 = email && email.length &&
      name && name.length && gender !== undefined;

    return (
      <div className={`${classes.root} socialLogin`}>
        <div className={`${classes.content} socialLogin-content`}>
          <form noValidate>
            <div style={this.state.pageOne}>
              {/* #267: SHIFT / CAPS, etc. dont work */}
              <FormControl className={classes.margin}>
                <Input
                  name="name"
                  onClick={this.changeFocus('name')}
                  id="custom-css-standard-name"
                  value={!this.state.name.length ? "Your name" : this.state.name}
                  classes={{
                    root: classes.textField,
                    underline: classes.cssUnderline,
                  }}
                />
              </FormControl>
              <FormControl className={classes.margin}>
                <Input
                  name="email"
                  onClick={this.changeFocus('email')}
                  id="custom-css-standard-email"
                  value={!this.state.email.length && this.state.focus !== 'email' ? "Your email" : this.state.email}
                  classes={{
                    root: classes.textField,
                    underline: classes.cssUnderline,
                  }}
                />
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
            </div>
            <div style={this.state.pageTwo}>
              <FormControl component="fieldset" className={classes.formControl}>
                <p>Your gender:</p>
                <RadioGroup
                  aria-label="Gender"
                  name="gender"
                  onChange={this.handleRadioChange}
                  className={classes.radioGroup}>
                  <FormControlLabel className="radio" checked={this.state.gender === 'female'} value="female" control={<Radio color="primary" />} label="Woman" />
                  <FormControlLabel className="radio" checked={this.state.gender === 'male'} value="male" control={<Radio color="primary" />} label="Man" />
                  <FormControlLabel className="radio" checked={this.state.gender === 'other'} value="other" control={<Radio color="primary" />} label="Other" />
                </RadioGroup>
              </FormControl>
            </div>
            <div style={this.state.pageOne}>
              <IconButton enabled={btnEnabledPg1} onClick={e => this.handleNextPage(e)} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </div>
            <div style={this.state.pageTwo}>
              <IconButton enabled={btnEnabledPg2} onClick={e => this.props.handleSubmit(e, this.state)} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,

};
SocialLogin.contextType = UserSession;

export default withStyles(window.innerWidth === 1920 ? styles_landscape : styles_portrait)(SocialLogin);
