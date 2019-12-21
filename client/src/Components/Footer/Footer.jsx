import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
    Footer: {
        bottom: 0,
        width:"100%",
        position:"fixed",
    }
}

function Footer(props) {
    const { classes } = props;
    return (
        <div className={classes.Footer}>
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

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
