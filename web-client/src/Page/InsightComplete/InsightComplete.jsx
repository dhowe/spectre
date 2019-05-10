import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Steps from '../Steps/Steps';
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

function InsightComplete(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Congratulations [username] </Typography>
                <Typography component="h3" variant="h3">Verification complete. </Typography>
                <IconButton icon="next" />
                <Typography component="h4" variant="h4">Our new behavioural products can create [powerful] insights</Typography>
                <Typography component="h4" variant="h4">As a reward for your belief in the [power] of data, we can share:</Typography>                
                <Typography component="h4" variant="h4">Sophie T’s OCEAN profile</Typography>
                <Link component={Steps} to="/steps">
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
