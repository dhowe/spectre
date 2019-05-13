import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Footer from "../../Components/Footer/Footer";
import TextInput from "../../Components/TextInput/TextInput";
import RadioInput from "../../Components/RadioInput/RadioInput";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Pledge from "../Pledge/Pledge";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

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
    this.state = { toPledge: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    // get user from context
    let currentUser = this.context;

    // assign submitted values
    if (e.target.hasOwnProperty('gender')) {
      currentUser.gender = e.target.gender.value;
    }
    if (e.target.hasOwnProperty('name')) {
      currentUser.name = e.target.name.value;
    }

    console.log('User:', currentUser);
    this.setState(() => ({ toPledge: true }));
  }

  render() {
    console.log('render');
    if (this.state.toPledge === true) { // hack redirect
      return <Redirect to='/pledge' />
    }
    return (
      <div className={this.props.classes.root + " Username"}>
            <SpectreHeader colour="white" />
            <div className={this.props.classes.content + " Username-content content"}>
              <form onSubmit = { this.handleSubmit }>
                  <FormControl className={this.props.classes.margin}>
                  <InputLabel classes={{
                      root: this.props.classes.cssLabel,
                      focused: this.props.classes.cssFocused
                  }}><br/>YOUR NAME?:
                  </InputLabel>
                  <Input name="name" id="custom-css-standard-input"
                  classes={{
                      root: this.props.classes.textField,
                      underline: this.props.classes.cssUnderline
                  }}/>
                  <br/>
                  <RadioInput options={['male', 'female', 'other']}>YOUR GENDER?</RadioInput>

                  <Button type="submit">
                  GO<br/>
                  </Button>
                  <Link component={Pledge} to="/pledge">
                      <IconButton icon="next" text="Begin"/>
                  </Link>
                </FormControl>
              </form>
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
