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

class OCEANReveal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.continue = this.continue.bind(this);
    this.modalContent = '';
    this.modalTitle = '';
    this.video = React.createRef();
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

  continue() {
    this.props.history.push('/take-back-control');
  }

  render() {
    const { classes } = this.props;
    const celeb = this.context.celebrity || 'Trump';
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        <Fade in />
        <Typography
          component="h6"
          variant="h6"
          style={{ marginTop: '165px' }}
        >
          A little data and a little tech
          <br />
          goes a long way, doesn&apos;t it?
        </Typography>
        <Typography
          component="h6"
          variant="h6"
          style={{ marginTop: '100px' }}
        >
          For example, we haven&apos;t known
          <br />
          you very long, but already
          <br />
          we know that...
        </Typography>
        <Modal
          isOpen={this.state.modalOpen}
          title={this.modalTitle}
          content={this.modalContent}
          onClose={() => this.closeModal()}
        />
        <Video
          ref={this.video}
          movie={`/video/wrapup/wrapup_${celeb}.mp4`}
          autoPlay={false}
          onComplete={this.continue}
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
