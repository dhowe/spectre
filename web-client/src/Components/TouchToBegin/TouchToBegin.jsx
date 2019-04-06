import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Login from '../../Page/Login/Login';


const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        position: 'relative',
        top: 0,
        left: 0,
    },
    grow: {
        flexGrow: 1,
    },
    TouchToBegin_image: {
        position: 'relative',
        top: 0,
        left: 0,
        minWidth: "100%",
    },
    TouchToBegin_logo: {
        position: 'absolute',
        top: '40%',
        left: '50%',
    }
};

function TouchToBegin(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Spectre
                    </Typography>
                </Toolbar>
            </AppBar>
            <Link className={classes.TouchToBegin_images} component={Login} to="/login">
                <img alt="Touch to Continue" className={classes.TouchToBegin_image} src="https://www.atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Hero/Experiences_Beach.jpg"></img>
                <img alt="Touch to Continue" className={classes.TouchToBegin_logo} src="https://i.gyazo.com/dedc1236cc349c728e64b134504bf774.png"></img>
            </Link>

        </div>
    );
}

TouchToBegin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TouchToBegin);
