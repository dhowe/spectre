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
    content: {
        paddingTop: "100px",
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function BelieveInDataism(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">To become more [powerful] you need more data.</Typography>
                <Typography component="h4" variant="h4">We can help you believe in the [power] of dataism</Typography>
                <Link component={Steps} to="/steps">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

BelieveInDataism.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BelieveInDataism);
