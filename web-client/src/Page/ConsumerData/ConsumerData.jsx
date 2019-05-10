import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PoliticalData from '../PoliticalData/PoliticalData'
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

function ConsumerData(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Choose 5 types of data:</Typography>
                <Typography component="h3" variant="h3">CONSUMER DATA:</Typography>
                [List of options here]
                <Link component={PoliticalData} to="/political-data">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

ConsumerData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsumerData);
