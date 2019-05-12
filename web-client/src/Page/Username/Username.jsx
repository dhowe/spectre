import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Footer from "../../Components/Footer/Footer";
import TextInput from "../../Components/TextInput/TextInput";
import RadioInput from "../../Components/RadioInput/RadioInput";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Pledge from "../Pledge/Pledge";
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

  componentDidMount() {
    let currentUser = this.context;
    console.log('Username',currentUser);
  }

  render() {

    return (
      <div className={this.props.classes.root + " Username"}>
            <SpectreHeader colour="white" />
            <div className={this.props.classes.content + " Username-content content"}>
                <TextInput >YOUR FIRST NAME?</TextInput>
                <RadioInput options={['WOMAN', 'MAN', 'OTHER']}>YOUR GENDER?</RadioInput>
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
