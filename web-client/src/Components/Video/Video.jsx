
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import movie from "./movie.mp4"

const styles = {
    Logo: {
        width: "100px",
        height: "100px",
    }
}

function Logo(props) {
    return (
        <div >
            <video width="320" height="240" controls>
                <source src={movie} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logo);
