import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = {
    TextInput: {

    }
}

function TextInput(props) {
    const { classes } = props;
    return (
        <div >
            <Typography variant="h6">{props.children}</Typography>
            <TextField
            id="standard-bare"
            className={classes.textField}
            defaultValue=""
            margin="normal"
            />
        </div>
    );
}

TextInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextInput);
