import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import InfluenceANation from "../InfluenceANation/InfluenceANation";
import IconButton from "../../Components/IconButton/IconButton";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",

    color: "black"
  }
};

function successAd(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <SpectreHeader colour="white" />
      <div className={classes.content + " content"}>
            <Typography component="h4" variant="h4">
        Your Facebook ad was successful!
        </Typography>
        <Typography component="h4" variant="h4">
            What we see changes who we are
        </Typography>
        <Typography component="h3" variant="h3">
            Sophie T is now more likely to vote [leave] in the referendum.
        </Typography>
        
        <Link component={InfluenceANation} to="/influence-a-nation">
          <IconButton icon="next" text="Next" />
        </Link>
      </div>
      <FooterLogo />
    </div>
  );
}

successAd.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(successAd);
