import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';
import Modal from '../../Components/Modal/Modal';
import './OCEANReveal.scss'
//import colours from '../../colors.scss';

const styles = {

};

class OCEANReveal extends React.Component {
  constructor(props) {
    super(props, '/take-back-control');
    this.timeout = -1;
    this.modalTitle = '';
    this.modalContent = '';
    this.video = React.createRef();
    this.state = { modalOpen: false, celebrity: '', sentences: [], readyForVideo: false };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['_id', 'name', 'login', 'gender', 'traits', 'celebrity']);

    let sentences = user.generateSummary();

    this.setState({ sentences: sentences, celebrity: user.celebrity });
    this.timeout = setTimeout(() => this.setState({ readyForVideo: true }), (sentences.length + 4) * 3000);
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

    let videoPlaceholder = readyForVideo ? (
      <Video ref={e => { this.video = e }} className={classes.video}
        movie={`https://spectreknows.me/video/wrapup_${celebrity}.mp4`} key="349587"
        onComplete={() => this.props.history.push('/take-back-control')}
      />) : <br />;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        <div className={`${classes.content} content`}>
        <Fade in={true}
          style={{ transitionDelay: 0 + 'ms' }}>
          <h1 className="addSpacing"><span>Spectre knows you.</span></h1>
          </Fade>
          <Fade in={true}
            style={{ transitionDelay: 3000 + 'ms' }}>
          <h2>We haven't known you for very long, <br/>but already we know…</h2>
          </Fade>
          {sentences.map((sent, i) => {
            return (
              <div className="reveal-box">
              <Fade key={i} in={true}
                style={{ transitionDelay: ((i+2) * 3000) + 'ms' }}>
                <p className="normal" key={`fade-${i+2}`}
                  >
                  {sent}
                </p>
              </Fade>
              </div>
            );
          })}
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
