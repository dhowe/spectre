import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Logo from "../../Components/Logo/Logo";
import Login from "../../Components/Login/Login";
import { Link } from 'react-router-dom';
import IntroVideo from '../IntroVideo/IntroVideo'

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundSize: 'cover',
        backgroundColor: '#2196f3',
    },
    content: {
        margin: "64px 0",
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function LoginPage(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                    </Typography>
            </Header>
            <div className={classes.content}>
                <Logo></Logo>
                <Typography component="h1" variant="h1">Hello!</Typography>
                <Typography component="h2" variant="h2">Let's Play!</Typography>
                <Login></Login>
                <Link component={IntroVideo} to="/intro-video">
                    <Typography>Skip</Typography>
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

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
