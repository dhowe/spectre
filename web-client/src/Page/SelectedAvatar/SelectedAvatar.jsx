import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InsightGender from '../InsightGender/InsightGender';
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

function SelectedAvatar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">You selected {props.selectedFollower.name}</Typography>
                <Typography component="h4" variant="h4">Lets start by verifying some of the basics to unlock {getAdverb(props.virtue)} insights into {props.selectedFollower.name}. Don’t worry only you will see the results. </Typography>
                <Link component={InsightGender} to="/insight-hair">
                    <IconButton icon="next" text="DIVE IN" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

SelectedAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedAvatar);
