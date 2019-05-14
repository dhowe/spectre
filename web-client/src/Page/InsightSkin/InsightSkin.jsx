import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import InsightAccuracy from "../InsightAccuracy/InsightAccuracy";
import IconButton from "../../Components/IconButton/IconButton";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";
import TextSliderText from "../../Components/TextSliderText/TextSliderText";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",

    color: "black"
  }
};

class InsightSkin extends React.Component {
  state = {
    value: 50
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h4" variant="h4">
            What is {this.props.selectedFollower.name}'s likely skin colour?
          </Typography>
          <TextSliderText leftText="Light" rightText="Dark" />
          <Link component={InsightAccuracy} to="/insight-accuracy">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InsightSkin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InsightSkin);
