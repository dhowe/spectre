import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TextInput from "../../Components/TextInput/TextInput";
import RadioInput from "../../Components/RadioInput/RadioInput";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundSize: 'cover',
        backgroundColor: '#F5FAFA',
    },
    content: {
        margin: "64px 0",
    },
    textInput: {
        marginBottom: "100px",
    }
};

function Username(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                    </Typography>
            </Header>
            <div className={classes.content}>
                <TextInput >YOUR FIRST NAME?</TextInput>
                <RadioInput options={['MAN', 'WOMAN', 'NON_BINARY']}>YOUR GENDER?</RadioInput>
                <Link component={Username} to="/username">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Begin
                    </Button>
                </Link>

            </div >

            <Footer>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Footer
                </Typography>
            </Footer>
        </div >
    );
}

Username.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Username);
