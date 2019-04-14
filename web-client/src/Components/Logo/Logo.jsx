import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import image from './Logo.png';

const styles = {
    Logo: {
        width: "100px",
        height: "100px",
    }
}

function Logo(props) {
    const { classes } = props;
    return (
        <div >
            <img className={classes.Logo} alt="logo" src={image}></img>
        </div>
    );
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logo);
