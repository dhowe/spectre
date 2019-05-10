import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import Logo from "../../Components/Logo/Logo";
import AvatarComponent from "../../Components/AvatarComponent/AvatarComponent";

import './TouchToBegin.scss';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundSize: 'cover',
        background: 'url(https://www.atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Hero/Experiences_Beach.jpg)',
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function TouchToBegin(props) {
    const { classes } = props;
    return (
        <div className={classes.root + ' touchToBegin'}>
            <div className={classes.content + " content"}>
                <Link className="touchToBegin-beginButton" component={LoginPage} to="/login">
                    <div className={classes.clickToContinue}>
                        <Logo></Logo>
                        <Typography>Touch to Begin!</Typography>
                    </div>
                </Link>
            </div >
        </div >
    );
}

TouchToBegin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TouchToBegin);
