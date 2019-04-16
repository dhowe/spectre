import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Video from "../../Components/Video/Video";
import { Link } from 'react-router-dom';
import Username from '../Username/Username'

const styles = {

};

function IntroVideo(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Video></Video>
            <Link component={Username} to="/username">
                <Typography>Skip</Typography>
            </Link>
        </div >
    );
}

IntroVideo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntroVideo);
