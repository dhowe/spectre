import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "../../Components/IconButton/IconButton";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";
import movie from "./OCEAN Intro V1.mp4";
const styles = {};

class IntroOceanVideo extends React.Component {
  componentDidMount() {
    this.refs.playVideo.click();
  }
  playVideo() {
    this.refs.video.play();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className="IntroOceanVideo-content content">
          <Typography>Intro to OCEAN</Typography>
          <video ref="video" width={window.innerWidth} controls>
            {" "}
            {/*autoplay*/}
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button hidden ref="playVideo" id='playButton' onClick={this.playVideo.bind(this)}>Play!</button>
          <Link to="/your-power">
            <IconButton icon="next" text="Skip" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

IntroOceanVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntroOceanVideo);
