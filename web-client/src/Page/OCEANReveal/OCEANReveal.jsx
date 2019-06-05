import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import Video from '../../Components/Video/Video';
import Modal from '../../Components/Modal/Modal';

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
    this.state = { toNext: false, modalOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.continue = this.continue.bind(this);
    this.modalContent = '';
    this.modalTitle = '';
    this.refs = {};
  }
  handleSubmit(e) {
    e.preventDefault();
    this.showVideo();
  }
  closeModal() {
    this.setState({ modalOpen: false });
  }
  renderRedirect() {
    if (this.state.toNext) {
      return <Redirect to="/take-back-control" />;
    }
  }
  showVideo() {
    this.video.play();
  }
  continue () {
    this.setState(() => ({ toNext: true }));
  }
  render() {
    const { classes } = this.props;
    const celeb = this.context.celebrity || 'Trump';
    return (
      <div className={classes.root}>
        {this.renderRedirect()}
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        <Typography component="h6" variant="h6"
          style={{marginTop:'500px'}}>A little data and a little tech <br/>goes a long way, doesn&apos;t it?</Typography>
        <Typography component="h6" variant="h6"
          style={{marginTop:'100px'}}>For example, we haven&apos;t known<br/> you very long, but already <br/>we know that...</Typography>
        <Modal
          isOpen={this.state.modalOpen}
          title={this.modalTitle}
          content={this.modalContent}
          onClose={() => this.closeModal()}
        />
        <Video
          ref={(el) => { this.video = el; }}
          movie={'/video/wrapup_'+celeb+'.mp4'}
          autoPlay={false}
          onComplete={this.continue}
        />
        <br/>
        <IconButton onClick={this.handleSubmit} icon="next" text="Next"/>
        <FooterLogo />
      </div>
    );
  }
}

OCEANReveal.propTypes = {
  classes: PropTypes.object.isRequired,
};
OCEANReveal.contextType = UserSession;

export default withStyles(styles)(OCEANReveal);
