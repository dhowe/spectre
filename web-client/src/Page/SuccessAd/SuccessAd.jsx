import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "../../Components/IconButton/IconButton";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",

    color: "black"
  }
};

class SuccessAd extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h4" variant="h4">
            Your Facebook ad was successful!
        </Typography>
          <Typography component="h4" variant="h4">
            What we see changes who we are.
        </Typography>
          <Typography component="h3" variant="h3">
            {this.props.selectedFollower.name} is now more likely to vote {this.context.brexitChoice} in the referendum.
        </Typography>

          <Link to="/influence-a-nation">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

SuccessAd.propTypes = {
  classes: PropTypes.object.isRequired
};
SuccessAd.contextType = UserSession;
export default withStyles(styles)(SuccessAd);
