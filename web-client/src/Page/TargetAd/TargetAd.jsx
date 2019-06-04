import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
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

class TargetAd extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
      <div className={classes.content + " content"}>
        <br/>
        <Typography component="h6" variant="h6">
          Share your targeted ad with {this.context.targetName||'Remy'}?
        </Typography>
        <Link to="/success-ad">
          <Grid container justify="center">
            <Grid item>
              <IconButton icon="tick" text="Yes" style={{fontSize:'400px'}}/>
            </Grid>
            <Grid item>
              <IconButton icon="next" text="No" />
            </Grid>
          </Grid>
        </Link>
        <br/>
      </div>
      <FooterLogo />
    </div>
    );
  }
}

TargetAd.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TargetAd);
