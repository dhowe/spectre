import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Steps from '../Steps/Steps'

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: '#F5FAFA',
        color: 'black'
    },
    content: {
        margin: "64px 0",
    },
    clickToContinue: {
        margin: "20% 0",
    },
    glow: {
        color: '#ffd700'
    }
};

function ThankYou(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                </Typography>
            </Header>
            <div className={classes.content}>
                <Typography component="h3" variant="h3">Thank you [username]!</Typography>
                <img src='https://cdn.pixabay.com/photo/2013/07/13/12/15/hand-159474__340.png' alt='thumbs up'></img>
                <Typography component="h4" variant="h4" >Your experience has been personalised.</Typography>
                <Link component={Steps} to="/steps">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Next
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

ThankYou.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThankYou);
