import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';

import './SocialLogin.scss';

const styles = {
    textField: {
        width: 300,
        color: grey[50],
        '&:before': {
            borderColor: grey[50],
        },
    },
    cssLabel: {
        color: grey[50],
        '&$cssFocused': {
            color: grey[50],
        },
    },
    cssFocused: {
        '&:after': {
            borderBottomColor: grey[50],
        },
    },
    cssUnderline: {
        '&:after': {
            borderBottomColor: grey[50],
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: grey[50],
        },
    },
    
};

function SocialLogin(props) {
    const { classes } = props;
    return (
        <div className={classes.root + " socialLogin"}>
            <div className={classes.content + " socialLogin-content"}>
                <FormControl className={classes.margin}>
                    <InputLabel
                    classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    }}
                    >
                    Enter email address
                    </InputLabel>
                    <Input
                    id="custom-css-standard-input"
                    classes={{
                        root: classes.textField,
                        underline: classes.cssUnderline,
                    }}
                    />
                </FormControl>
            </div >
        </div>
    );
}

SocialLogin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocialLogin);
