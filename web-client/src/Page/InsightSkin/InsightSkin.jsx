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
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: "black"
  }
};

class InsightSkin extends React.Component {
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
    const tname = (this.context.getTarget().name || 'Pat');
    const timg = this.context.targetImgUrl() || '/profiles/default.jpg';
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content insightPage"}>
          <Typography component="h6" variant="h6">
            What is {tname}'s likely skin colour?
          </Typography>
          <AvatarComponent target={{ image: timg }}/>
          <div onTouchEnd={this.EnableButton}>
            <TextSliderText leftText="Light" rightText="Dark" />
          </div>
          <Link className={this.state.buttonEnabled ? "true" : "disabled"} to="/insight-financial">
            <IconButton enabled={this.state.buttonEnabled} icon="next" text="Next" />
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
InsightSkin.contextType = UserSession;


export default withStyles(styles)(InsightSkin);
