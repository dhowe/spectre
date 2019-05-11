import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logo from "../../Components/Logo/Logo";
import Login from "../../Components/Login/Login";
import { Link } from 'react-router-dom';
import IntroVideo from '../IntroVideo/IntroVideo'
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';

import './LoginPage.scss';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundSize: 'cover',
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function LoginPage(props) {
    const { classes } = props;
    return (
        <div className={classes.root + " LoginPage"}>
            <SpectreHeader />
            <div className={classes.content + " LoginPage-content content"}>
                <Logo></Logo>
                <Typography component="h1" variant="h1">Hello!</Typography>
                <Typography component="h2" variant="h2">Let's Play!</Typography>
                <SocialLogin />
                <Link component={IntroVideo} to="/intro-video">
                    <IconButton colour="white" icon="next" text="Next" />
                </Link>
            </div>
        </div>
    );
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
