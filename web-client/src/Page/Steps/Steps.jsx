import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PersonalisedExperience from '../PersonalisedExperience/PersonalisedExperience';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",

        color: 'black'
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function Steps(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h5" variant="h5">Find what you are looking for by following these three steps:</Typography>
                <Typography component="h6" variant="h6"><strong>Step 1</strong> - influence a follower</Typography>
                <Typography component="h6" variant="h6"><strong>Step 2</strong> - influence a nation</Typography>
                <Typography component="h6" variant="h6"><strong>Step 3</strong> - influence a celebrity</Typography>
                <Typography component="h5" variant="h5">Get the data. Get the {props.virtue}.</Typography>
                <Typography component="h4" variant="h4">Ready?</Typography>
                <Link component={PersonalisedExperience} to="/personalised-experience">
                    <IconButton icon="next" text="Yes" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

Steps.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Steps);
