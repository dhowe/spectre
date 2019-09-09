import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
//import IconButton from '../../Components/IconButton/IconButton';
import './WeAreSorry.scss';
import Video from '../../Components/Video/Video';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown-now';
import NavigationHack from '../NavigationHack';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black',
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class WeAreSorry extends NavigationHack  {

  constructor(props) {
      super(props,'/Goodbye')
      this.showVideo = this.showVideo.bind(this)

      this.state = {
        fadeOut: false
      };
    }

  componentDidMount() {
    setTimeout(function() { //Start the timer
        this.setState({videoPlayback: true}) //After 1 second, set render to true
    }.bind(this), 1000)

  }

  showVideo() {
    this.video.play();
  }
  changeFade(){
    this.state.fadeOut = !this.state.fadeOut;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
          <Fade in={!this.state.fadeOut} timeout={1000} style={{transitionDelay: '1000ms'}}>
          <Typography className="normaltext" component="h3" variant="h3" ><strong className="username">We’re sorry {(this.context.name||'Remy')},<br/></strong>
            we’re afraid you can’t do that.</Typography>
            </Fade>

              <Countdown
                onComplete={this.showVideo}
                date={Date.now() + 5000}
                renderer={() => null}
              />

              <Video
                ref={(el) => { this.video = el; }}
                movie="/video/SpectreIntro.mp4"
                autoPlay={false}
                onComplete={this.next}
              />

          </div >
          <FooterLogo />
      </div >
    );
  }
}

WeAreSorry.propTypes = {
  classes: PropTypes.object.isRequired,
};
WeAreSorry.contextType = UserSession;

export default withStyles(styles)(WeAreSorry);
