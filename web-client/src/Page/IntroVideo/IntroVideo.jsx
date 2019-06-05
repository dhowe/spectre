import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import movie from './Intro_to_Spectre_V1 .mp4';

const styles = {};

class IntroVideo extends React.Component {
  componentDidMount() {
    this.refs.playVideo.click();
  }
  playVideo() {
    this.refs.video.play();
  }
  goTo() {
    this.props.history.push('/username');
  }
  render() {
    const { classes } = this.props;
    const timer = ({ seconds, completed }) => {
      if (completed) {
        // Render a complete state
        return null;
      } else {
        // Render a countdown
        return <span>{seconds}</span>;
      }
    };
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className="IntroVideo-content content">
          <Typography component="h5" variant="h5">Meet Spectre</Typography>
          <video ref="video" width={'880px'} controls>
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            hidden
            ref="playVideo"
            id="playButton"
            onClick={this.playVideo.bind(this)}
          >
            Play!
          </button>
          <div className="hidden">
            <Countdown
              onComplete={this.goTo.bind(this)}
              date={Date.now() + 5000}
              renderer={timer}
            />
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

IntroVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntroVideo);
