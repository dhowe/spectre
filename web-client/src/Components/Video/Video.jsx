
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import movie from "./movie.mp4"

const styles = {

}

function Video(props) {


    return (
        <div >
            <video width={window.innerWidth} autoplay controls>
                <source src={movie} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

Video.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Video);
