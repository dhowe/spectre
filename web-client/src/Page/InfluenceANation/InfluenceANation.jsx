import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ConsumerData from '../ConsumerData/ConsumerData'
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

function influenceANation(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Influence A Nation</Typography>
                <Typography component="h4" variant="h4">Lets increase the [power] of your campaign to influence lots of people to vote [Leave] in the referendum.</Typography>
                <Typography component="h4" variant="h4">We can show you how, but first, you must:</Typography>
                <Link component={ConsumerData} to="/consumer-data">
                    <IconButton icon="next" text="Get more data" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

influenceANation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(influenceANation);
