import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';    
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import TargetAd from '../TargetAd/TargetAd'
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

function darkAd(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">[Ad generator here]</Typography>
                <Link component={TargetAd} to="/target-ad">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

darkAd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(darkAd);
