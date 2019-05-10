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

function Username(props) {
    const { classes } = props;
    return (
        <div className={classes.root + " Username"}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " Username-content content"}>
                <TextInput >YOUR FIRST NAME?</TextInput>
                <RadioInput options={['MAN', 'WOMAN', 'NON_BINARY']}>YOUR GENDER?</RadioInput>
                <Link component={Pledge} to="/pledge">
                    <IconButton icon="next" text="Begin" />
                </Link>
                
            </div >
            <FooterLogo />
        </div >
    );
}

Username.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Username);
