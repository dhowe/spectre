import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IntroOceanVideo from '../IntroOceanVideo/IntroOceanVideo';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",

        color: 'black'
    },
};

function SocialMedia(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Social Media END FOR NOW [username] </Typography>
                {/* <Link component={IntroOceanVideo} to="/intro-ocean-video">
                    <IconButton icon="next" text="WTF is OCEAN?" />
                </Link> */}
            </div>
            <FooterLogo />
        </div >
    );
}

SocialMedia.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocialMedia);
