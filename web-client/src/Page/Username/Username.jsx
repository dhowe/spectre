import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RadioInput from "../../Components/RadioInput/RadioInput";
import { Link } from 'react-router-dom';
import Pledge from "../Pledge/Pledge";
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import UserSession from '../../Components/UserSession/UserSession';

import './Username.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundSize: 'cover',

  },
  textInput: {
    marginBottom: "100px",
  }
};

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: 'woman',
    };
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.set_key('name', event.target.value)
  };

  handleRadioChange = event => {
    this.setState({ gender: event.target.value });
    this.props.set_key('gender', event.target.value)
  };

  componentDidMount() {
    let currentUser = this.context;
    console.log('Username', currentUser);
  }

  render() {

    return (
      <div className={this.props.classes.root + " Username"}>
        <SpectreHeader colour="white" />
        <div className={this.props.classes.content + " Username-content content"}>
          <Typography variant="h6">YOUR FIRST NAME?</Typography>
          <TextField value={this.state.name} onChange={this.handleChange('name')}></TextField>
          {/* <RadioInput value={this.state.gender} onChange={this.handleRadioChange} options={['WOMAN', 'MAN', 'OTHER']}>YOUR GENDER?</RadioInput> */}
          <Typography variant="h6">YOUR GENDER?</Typography>
          <FormControl component="fieldset" >
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              value={this.state.value}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel value="woman" control={<Radio />} label="Woman" />
              <FormControlLabel value="man" control={<Radio />} label="Man" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <Link component={Pledge} to="/pledge">
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
