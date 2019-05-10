import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import DarkAd from '../DarkAd/DarkAd'
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

function InfluencedBy(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">Sophie T ‘s OCEAN profile shows she is most likely influenced by:</Typography>
                <Typography component="h4" variant="h4">[List of influences]</Typography>
                <Typography component="h4" variant="h4">Use our design tool to create a targetted facebook ad to influence [Sophie T]’s vote</Typography>

                <Link component={DarkAd} to="/dark-ad">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

InfluencedBy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfluencedBy);
