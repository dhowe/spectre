import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InsightWeight from '../InsightWeight/InsightWeight';
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

function InsightHairColor(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">What’s [username]’s likely gender?</Typography>
                <Link component={InsightWeight} to="/insight-weight">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

InsightHairColor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightHairColor);
