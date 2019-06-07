import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/es/Fade/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';
import Modal from '../../Components/Modal/Modal';
import User from '../../Components/User/User';
import NavigationHack from '../NavigationHack';

import colours from '../../colors.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class OCEANReveal extends NavigationHack {
  constructor(props) {
    super(props, '/take-back-control');
    this.durationMS = 500;
    this.showMS = 2000;
    this.showVideo = this.showVideo.bind(this);
    this.state = { modalOpen: false };
    this.modalContent = '';
    this.modalTitle = '';

    const user = this.context || new User(UserSession.defaults[0]);
    if (user && !user.hasOceanTraits()) {
      user._randomizeTraits();
    }

    this.sentences = [
      'A little data and a little tech goes a long way.',
      'We haven\'t known you for very long, but already we know…',
    ];
    let summary = user.generateSummary();
    console.log(summary);
    this.sentences = this.sentences.concat(summary);

    for (let i = 0; i < this.sentences.length; i++) {
      const fadeKey = `fade-${i}`;
      this.state = {
        ...this.state,
        [fadeKey]: true,
      };
    }
    setTimeout(this.showVideo, ((this.durationMS * 2) + this.showMS) * this.sentences.length);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  showVideo() {
    this.video.play();
  }

  render() {
    const { classes } = this.props;

    const user = this.context || {};
    user.name = user.name || 'Pat';
    user.gender = user.gender || 'female';
    user.celebrity = user.celebrity || 'Trump';

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        <div style={{
          height: 600,
          marginTop: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center' }}
        >
          {this.sentences.map((sent, i) => {
            const fadeKey = `fade-${i}`;
            return (
              <Typography
                variant="h6"
                component="h6"
                key={fadeKey}
                style={{ color: colours.grey, width: '80%', margin: '50px 0' }}
              >
                {sent}
              </Typography>
            );
          })}
        </div>
        <Modal
          isOpen={this.state.modalOpen}
          title={this.modalTitle}
          content={this.modalContent}
          onClose={() => this.closeModal()}
        />
        <Video
          ref={(el) => { this.video = el; }}
          movie={`/video/wrapup_${user.celebrity}.mp4`}
          autoPlay={false}
          onComplete={this.next}
        />
        <br />
        <FooterLogo />
      </div>
    );
  }
}

OCEANReveal.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
OCEANReveal.contextType = UserSession;

export default withStyles(styles)(OCEANReveal);
