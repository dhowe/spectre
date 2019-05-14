import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InsightThankYou from '../InsightThankYou/InsightThankYou';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import TextSliderText from "../../Components/TextSliderText/TextSliderText";

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",

        color: 'black'
    },
};

function InsightStyle(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">What’s {props.selectedFollower.name}‘s likely style category?</Typography>
                <Link component={InsightThankYou} to="/insight-thank-you">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

InsightStyle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightStyle);
