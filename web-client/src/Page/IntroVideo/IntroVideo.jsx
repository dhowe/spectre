import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Video from "../../Components/Video/Video";
import { Link } from 'react-router-dom';
import Username from '../Username/Username'
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {

};

function IntroVideo(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className="IntroVideo-content content">
                <Video></Video>
                <Link component={Username} to="/username">
                    <IconButton icon="next" text="Skip" />
                </Link>
                
            </div>
            <FooterLogo />  
        </div>
    );
}

IntroVideo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntroVideo);
