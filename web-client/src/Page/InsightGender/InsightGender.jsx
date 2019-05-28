import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "../../Components/IconButton/IconButton";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";
import TextSliderText from "../../Components/TextSliderText/TextSliderText";
import AvatarComponent from "../../Components/AvatarComponent/AvatarComponent";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: "black"
  }
};

class InsightGender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonEnabled: false};

    this.EnableButton = this.EnableButton.bind(this);
  }

  EnableButton() {
    this.setState({
      buttonEnabled: true
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h4" variant="h4">
            What’s {this.props.selectedFollower.name}’s likely gender?
          </Typography>
          <AvatarComponent target={{ image: '/targets/target0.png' }}/>
          <div onTouchEnd={this.EnableButton}>
            <TextSliderText leftText="Male" rightText="Female" middleText="non-binary" />
          </div>
          <Link className={this.state.buttonEnabled ? "enabled" : "disabled"} to="/insight-weight">
            {this.state.buttonEnabled ? "enabled" : "disabled"}
            <IconButton enabled={this.state.buttonEnabled} icon="next" text="Next" />
          </Link>
          <button onTouchEnd={this.EnableButton}>show alert</button>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InsightGender.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InsightGender);
