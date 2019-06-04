import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Countdown from 'react-countdown-now';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import movie from './OCEAN Intro V1.mp4';
import NavigationHack from '../NavigationHack';

const styles = {};

class IntroOceanVideo extends NavigationHack {
  constructor(props) {
    super(props, '/your-power');
  }
  componentDidMount() {
    this.refs.playVideo.click();
  }
  playVideo() {
    this.refs.video.play();
  }
  render() {
    const { classes } = this.props;
    const timer = ({ seconds, completed }) => {
      if (completed) {
        // Render a complete state
        return null;
      } else {
        // Render a countdown
        return <span className="hidden">{seconds}</span>;
      }
    };
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className="IntroOceanVideo-content content">
          <Typography component="h5" variant="h5">Intro to OCEAN</Typography>
          <video ref="video" width={'880px'} controls>
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button hidden ref="playVideo" id='playButton' onClick={this.playVideo.bind(this)}>Play!</button>
          <Countdown
            onComplete={this.next}
            date={Date.now() + 5000}
            renderer={timer}
          />
        </div>
        <FooterLogo />
      </div >
    );
  }
}

IntroOceanVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntroOceanVideo);
