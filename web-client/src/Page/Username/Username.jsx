import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserSession from '../../Components/UserSession/UserSession';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';
import './Username.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundSize: 'cover',
  },
  textInput: {
    marginBottom: "100px",
  },
  radioGroup: {
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: '45%'
  }
};

class Username extends React.Component {
  onNameChange(input) {
    this.setState({ name: input });
    this.context.name = input;
  }

  handleChange = name => event => {
    let input = event.target.value;
    this.setState(
      {
        name: input
      },
      () => {
        this.keyboardRef.keyboard.setInput(input);
      }
    );
    this.context.name = input;
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
    this.state = {
      name: '',
      gender: 'woman',
      layoutName: "default"
    };
    this.unShiftNeeded = false;
    this.handleChange = this.handleChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  };

  handleRadioChange = event => {
    this.context.gender = event.target.value; // user-prop
    this.setState({ gender: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + " Username"}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " Username-content content"}>
          <Typography variant="h6">YOUR FIRST NAME?</Typography>
          <TextField
             id="name"
             label=""
             className={classes.textField}
             value={this.state.name}
             onChange={this.handleChange("name")}
             margin="normal"
             variant="outlined"
           />
          <div id='keywrapper'>
          <Keyboard
              ref={r => (this.keyboardRef = r)}
              onChange={input => this.onNameChange(input)}
              onKeyPress={button => this.onKeyPress(button)}
              layoutName={this.state.layoutName}
              layout={{
                default: [
                  "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                  "{tab} q w e r t y u i o p [ ] \\",
                  "{lock} a s d f g h j k l ; ' {enter}",
                  "{shift} z x c v b n m , . / {shift}",
                  "@ {space}"
                ],
                shift: [
                  "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                  "{tab} Q W E R T Y U I O P { } |",
                  '{lock} A S D F G H J K L : " {enter}',
                  "{shift} Z X C V B N M < > ? {shift}",
                  "@ {space}"
                ]
              }} 
            />
          </div>

          <Typography variant="h6"><br/>YOUR GENDER?</Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="Gender"
              name="gender"
              value={this.state.value}
              onChange={this.handleRadioChange}
              className={classes.radioGroup}
            >
              <FormControlLabel value="female" control={<Radio color='primary' />} label="Woman" />
              <FormControlLabel value="male" control={<Radio color='primary' />} label="Man" />
              <FormControlLabel value="other" control={<Radio color='primary' />} label="Other" />
            </RadioGroup>
          </FormControl>
          <Link to="/pledge">
            <IconButton icon="next" text="Begin" />
          </Link>
        </div >
        <FooterLogo />
      </div >
    );
  }
}

Username.propTypes = {
  classes: PropTypes.object.isRequired,
};

Username.contextType = UserSession;

export default withStyles(styles)(Username);
