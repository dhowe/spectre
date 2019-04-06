import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
    },
    grow: {
        flexGrow: 1,
    },
    TouchToBegin_image: {
        minWidth: "100%",
    }
};

function ButtonAppBar(props) {
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
            <Link component={Link} to="/touch-to-begin">
                <img alt="Touch to Continue" className="TouchToBegin_image" src="https://www.atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Hero/Experiences_Beach.jpg"></img>
            </Link>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
