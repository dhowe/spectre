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
    this.state = { modalOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modalContent = '';
    this.modalTitle = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showVideo();
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  showVideo() {
    this.video.current.play();
  }

  render() {
    const { classes } = this.props;

    const user = this.context;
    user.name = user.name || 'Pat';
    user.gender = user.gender || 'female';
    user.celebrity = user.celebrity || 'Trump';
    if (!user.hasOceanTraits()) user._randomizeTraits();

    let sentences = ['A little data and a little tech goes a long way.',
              'We haven\'t known you for very long, but already we know that…'];
    sentences = sentences.concat(this.context.generateSummary());

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        {sentences.map((sent,i) => (
          <Typography component="h6" style={{ marginTop: '170px'}}
            key={i} variant="h6">{sent}</Typography>
        ))}
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
        <IconButton onClick={this.handleSubmit} icon="next" text="Next"/>
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
