import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SocialMedia from '../SocialMedia/SocialMedia'
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

function TargetsFound(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">Analysing data sets and looking for patterns...</Typography>
                <Typography component="h4" variant="h4">Consumer..... Political........ Home........</Typography>
                [Image of map]
                <Typography component="h3" variant="h3">Targets found: [1,095,405 ]</Typography>
                <Link component={SocialMedia} to="/social-media">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

TargetsFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TargetsFound);
