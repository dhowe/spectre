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

function InsightThankYou(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
            <Typography component="h3" variant="h3">Great</Typography>
            <Typography component="h4" variant="h4">Now you are beginning to think like an algorithm.</Typography>
            <Typography component="h4" variant="h4">Just 2 more to go</Typography>
            <Link to="/insight-sexuality">
                <IconButton icon="next" text="Deeper still" />
            </Link>
        </div>
        <FooterLogo />
    </div>
  );
}

InsightThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightThankYou);
