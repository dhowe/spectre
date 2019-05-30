import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './Progress.scss';

const styles = {
}

function Header(props) {
    const { classes } = props;
    return (props.active ?
        <div className={"progress progress-" + props.progressNumber}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
        </div>
        : null
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
