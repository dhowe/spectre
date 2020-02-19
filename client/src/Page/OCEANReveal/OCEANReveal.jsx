import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';
import Modal from '../../Components/Modal/Modal';

import { withStyles } from '@material-ui/core/styles';
import './OCEANReveal.scss'

const keyPause = 50; // typing speed for each character
const linePause = 4; // linePause * keyPause = wait time after each sentence
const timing = [ 0 , 2000, 4000];
const styles = {};

class OCEANReveal extends React.Component {

  constructor(props) {
    super(props, '/take-back-control');
    this.timeout = -1;
    this.modalTitle = '';
    this.modalContent = '';
    this.video = React.createRef();
    this.state = { modalOpen: false, celebrity: '',
      sentences: [], readyForVideo: false };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'login', 'gender', 'traits', 'celebrity']);

    const sentences = user.generateSummary();
    const totalChar = sentences.join().length;
    const waitingTime = (totalChar * keyPause)
      + ((sentences.length - 1) * linePause)
      + timing.reduce((a,v) => a+v) + 1000;

    this.setState({ sentences: sentences, celebrity: user.celebrity });
    this.timeout = setTimeout(() => this.setState
      ({ readyForVideo: true }), waitingTime);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { celebrity, sentences, modalOpen, readyForVideo } = this.state;

    let timer = 0, videoPlaceholder = readyForVideo ? (
      <Video key="349587"
        ref={e => { this.video = e }}
        className={classes.video}
        movie={`${UserSession.publicUrl}video/wrapup_${celebrity}.mp4`}
        onComplete={() => this.props.history.push('/take-back-control')}
      />) : <br />;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        <div className={`${classes.content} content`}>
          <Fade in={true}
            style={{ transitionDelay: timing[0] + 'ms' }}>
            <h1 className="addSpacing"><span>Spectre knows you.</span></h1>
          </Fade>
          <Fade in={true}
            style={{ transitionDelay: timing[1] + 'ms' }}>
            <h2>We haven't known you for very long, <br />but already we know…</h2>
          </Fade>
          {
            sentences.map((sent, i) => {
            return (
              <p className="normal" key={i}>
                {
                  sent.split('').map((letter, j) => {
                    let delay = timing[2] + ((++timer + (i * linePause)) * keyPause);
                    return (
                      <Fade key={j} in={true} style={{ transitionDelay:  delay + 'ms' }}>
                        <span key={`fade-${i}`} style={{ color: '#4F4F4F' }}>
                          {letter}
                        </span>
                      </Fade>
                    );
                  })
                }
              </p>
            );
          })
        }
        </div>
        <Modal
          isOpen={modalOpen}
          title={this.modalTitle}
          content={this.modalContent}
          onClose={this.closeModal}
        />
        {videoPlaceholder}
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
