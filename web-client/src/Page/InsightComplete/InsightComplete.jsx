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

function getAdverb(virtue) {
    const adverbs = {
        power: 'powerful',
        truth: 'truthful',
        wealth: 'valuable',
        faith: 'faithful',
        influence: 'influential',
    }
    return adverbs[virtue]
}

function InsightComplete(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Congratulations {props.name} </Typography>
                <Typography component="h3" variant="h3">Verification complete. </Typography>
                <IconButton icon="next" />
                <Typography component="h4" variant="h4">Our new behavioural products can create {getAdverb(props.virtue)} insights</Typography>
                <Typography component="h4" variant="h4">As a reward for your belief in the {props.virtue} of data, we can share:</Typography>
                <Typography component="h4" variant="h4">{props.selectedFollower.name}’s OCEAN profile</Typography>
                <Link component={IntroOceanVideo} to="/intro-ocean-video">
                    <IconButton icon="next" text="WTF is OCEAN?" />
                </Link>
            </div>
            <FooterLogo />
        </div >
    );
}

InsightComplete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightComplete);
