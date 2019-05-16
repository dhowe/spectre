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
    display: "inline-block"
  },
  formControl: {
    textAlign: "center"
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
    this.context.name = event.target.value; // user-prop
    this.setState({
      [name]: event.target.value });
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
          <TextField value={this.state.name} onChange={this.handleChange('name')}></TextField>
          {/* <RadioInput value={this.state.gender} onChange={this.handleRadioChange} options={['WOMAN', 'MAN', 'OTHER']}>YOUR GENDER?</RadioInput> */}
          <Typography variant="h6">YOUR GENDER?</Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="Gender"
              name="gender"
              value={this.state.value}
              onChange={this.handleRadioChange}
              className={classes.radioGroup}
            >
              <FormControlLabel value="female" control={<Radio />} label="Woman" />
              <FormControlLabel value="male" control={<Radio />} label="Man" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
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
