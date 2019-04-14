import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
    Header: {
        position: 'relative',
        top: 0,
        left: 0,
        minWidth: "100%",
    }
}

function Header(props) {
    const { classes } = props;
    return (
        <div className={classes.Header}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {props.children}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
