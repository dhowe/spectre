import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
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

function InsightAccuracy(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
            <Typography component="h5" variant="h5">Excellent! </Typography>
            <IconButton icon="trophy" />
            <Typography component="h6" variant="h6">Your accuracy level is high.
            You are starting to see {props.selectedFollower.name} as we see do.
            </Typography>
            <Link to="/insight-financial">
                <IconButton icon="next" text="Let's go deeper" />
            </Link>
        </div>
        <FooterLogo />
    </div>
  );
}

InsightAccuracy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightAccuracy);
