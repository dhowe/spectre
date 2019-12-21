import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import { Link } from "react-router-dom";
import IconButton from "../../Components/IconButton/IconButton";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

function SocialMedia(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <SpectreHeader colour="white" />
      <div className={classes.content + " content"}><br />
        <Typography component="h3" variant="h3"></Typography>
        <Link to="/launch-campaign">
          <IconButton icon="next" text="Reset" />
        </Link>
      </div>
      <FooterLogo />
    </div >
  );
}

SocialMedia.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocialMedia);
