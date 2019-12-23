import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import image from './logo.svg';

const styles = {
    Logo: {
        width: "200px",
        height: "200px",
    }
}

function Logo(props) {
    const { classes } = props;
    return (
        <div>
            <img className={classes.Logo} alt="logo" src={image}></img>
        </div>
    );
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logo);
