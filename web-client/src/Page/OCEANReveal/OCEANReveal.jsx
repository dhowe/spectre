import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import Video from '../../Components/Video/Video';
import Modal from '../../Components/Modal/Modal';
import NavigationHack from '../NavigationHack';
import Fade from '@material-ui/core/es/Fade/Fade';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class OCEANReveal extends NavigationHack {
  constructor(props) {
    super(props, '/take-back-control');
    this.durationMS = 1000;
    this.showMS = 3000;
    this.state = { modalOpen: false };
    this.prepNext = this.prepNext.bind(this);
    this.timeout = this.timeout.bind(this);
    this.modalContent = '';
    this.modalTitle = '';

    const user = this.context || { celebrity: 'Freeman', generateSummary: () => {}, hasOceanTraits: () => true };

    if (user && !user.hasOceanTraits()) {
      user._randomizeTraits();
    }
    this.sentences = [
      'A little data and a little tech goes a long way.',
      'We haven\'t known you for very long, but already we know that…',
      'more',
      'another more',
    ];
    this.sentences = this.sentences.concat(user.generateSummary());
    for (let i = 0; i < this.sentences.length; i++) {
      const fadeKey = `fade-${i}`;
      this.state = {
        ...this.state,
        [fadeKey]: true,
      };

    }
    this.step = 0;

    this.prepNext();
  }

  timeout() {
    if (this.step < this.sentences.length) {
      this.setState({
        [`fade-${this.step}`]: false,
      });
    } else {
      this.showVideo();
    }

    this.step += 1;
    this.prepNext();
  }

  prepNext() {
    setTimeout(() => {
      if (this.step < this.sentences.length) {
        this.setState({
          [`fade-${this.step}`]: false,
        });
      } else {
        this.showVideo();
      }

      this.step += 1;
      this.prepNext();
    }, ((this.duration * 2) + this.showMS));
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
          marginTop: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' }}
        >
          {this.sentences.map((sent, i) => {
            const fadeKey = `fade-${i}`;
            return (
              <Fade in={this.state[fadeKey]} style={{ transitionDelay: `${((this.duration * 2) + this.showMS) * i}ms`, transitionDuration: `${this.durationMS}ms` }}>
                <Typography
                  variant="h6"
                  component="h6"
                  key={fadeKey}
                  style={{ position: 'absolute' }}
                >
                  {sent}
                </Typography>
              </Fade>
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
