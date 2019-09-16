import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import NavigationHack from '../NavigationHack';
import { ReactComponent as ThumbUp } from '../../Icons/insightthankyou.svg';
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
  glow: {
    color: '#ffd700',
  },
  copy: {
    fontSize: '48px',
  }
};

// Interstitial
class ThankYou extends NavigationHack {
  constructor(props) {
    super(props, '/steps');
    this.state = {
      //modal
      modalOpen: false,
      //timout checker
      idleTimer : 0,
      resetTimer : 5,
      isIdle : false,
    }
    //modal
    this.modalContent = '';
    this.modalTitle = '';
    //timout checker
    this.handleIdle = this.handleIdle.bind(this);
    this.detectClick = this.detectClick.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.interval = '';
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  componentDidMount() {
    this.interval = setInterval(this.handleIdle, 1000);
  }

  handleIdle(){

    let timer = this.state.idleTimer;
    console.log(timer);
    if(timer > 10 ){
      this.state.isIdle = true;
    }else{
      this.state.idleTimer = this.state.idleTimer + 1;
    }
    if(this.state.isIdle){
      this.modalTitle = this.state.resetTimer + '';
      this.modalContent = 'Are you still here?';
      this.setState({ modalOpen: true });
      this.state.resetTimer -= 1;
    }
    if(this.state.resetTimer<=-1){
        window.open("/", "_self");
    }
  }

  detectClick(e) {
    if (e) {
      this.state.idleTimer = 0;
      this.state.isIdle = false;
      this.state.resetTimer = 5;
      if(this.modalContent.includes('Are you still here?') && this.state.modalOpen){
        this.closeModal();
      }
    }
  }

  clearTimer(){
    clearInterval(this.interval);
  }

  render() {
    const { classes } = this.props;
    console.log("User:", this.context);
    return (
      <div className={classes.root} onClick={this.detectClick}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <div>
            <p className={classes.copy}>Thank you, <strong>{this.context.name}!</strong></p>
            <ThumbUp className="insight-thank-you-icon" />
            <p className={classes.copy}>Your experience has been <strong>personalised.</strong></p>
          </div>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <Link to="/steps">
            <IconButton icon="next" text="Next" onClick={this.clearTimer}/>
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};
ThankYou.contextType = UserSession;

export default withStyles(styles)(ThankYou);
