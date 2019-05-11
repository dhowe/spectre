import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SearchingFor from '../SearchingFor/SearchingFor';
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
    }
};

function YourPower(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
            
                <Typography component="h4" variant="h4">[username], your [power] is growing.</Typography>
                <Typography component="h4" variant="h4">Let's put it into practice.</Typography>
                <Link component={SearchingFor} to="/pick-a-side">
                    <IconButton icon="next" text="Next" />
                </Link>

            </div >
            <FooterLogo />
        </div >
    );
}

YourPower.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YourPower);
