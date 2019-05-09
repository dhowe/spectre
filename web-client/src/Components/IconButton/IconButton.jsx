import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import nextIcon from '../../Icons/next.svg';

import './IconButton.scss';

const styles = {
    
};

function IconButton(props) {
    const { classes } = props;
    return (
        <div className="iconButton">
            {props.icon == "next" && <img width="100" height="100" alt="next" src={nextIcon}></img>}
            <div className="iconButtonText">{props.text}</div>
        </div >
    );
}

IconButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButton);
