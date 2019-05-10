import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InfluencedBy from '../InfluencedBy/InfluencedBy'
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

function Campaign(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">The [Leave] campaign is in jeopardy.</Typography>
                <Typography component="h4" variant="h4">Longer delays to Brexit increase the risk of it not happening.</Typography>
                <Typography component="h4" variant="h4">We’re going to run a ‘grassroots’ campaign to influence [Sophie T] to vote Leave.</Typography>
                <Link component={InfluencedBy} to="/influenced-by">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

Campaign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Campaign);
