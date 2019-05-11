import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Game from '../Game/Game';
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
    },
    glow: {
        color: '#ffd700'
    }
};

function PersonalisedExperience(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Excellent</Typography>
                <Typography component="h3" variant="h3">In order to create your</Typography>
                <Typography component="h3" variant="h3" className={classes.glow}><strong>personalised experience</strong></Typography>
                <Typography component="h4" variant="h4" >Tell us what you love, tell us what you hate...</Typography>
                <Link component={Game} to="/game">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div >
            <FooterLogo />
        </div>
    );
}

PersonalisedExperience.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalisedExperience);
