import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import NavigationHack from '../NavigationHack';
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

class Steps extends NavigationHack {
  constructor(props) {
    super(props, '/influence-a-follower');
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
    return (
      <div className={classes.root} onClick={this.detectClick}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
            <Fade in={true} >
                <Typography component="h5" variant="h5">Find what you are looking for by following these three steps:</Typography>
            </Fade>
            <Fade in={true} style={{transitionDelay: '1000ms'}}>
                <Typography component="h6" variant="h6"><strong>Step 1</strong> - influence a follower</Typography>
            </Fade>
            <Fade in={true} style={{transitionDelay: '2000ms'}}>
                <Typography component="h6" variant="h6"><strong>Step 2</strong> - influence a nation</Typography>
            </Fade>
            <Fade in={true} style={{transitionDelay: '3000ms'}}>
                <Typography component="h6" variant="h6"><strong>Step 3</strong> - influence a celebrity</Typography>
            </Fade>
            <Fade in={true} style={{transitionDelay: '4000ms'}}>
                <Typography component="h5" variant="h5">Get the data. Get the {this.context.virtue}.</Typography>
            </Fade>
            <Fade in={true} style={{transitionDelay: '5000ms'}}>
                <Typography component="h6" variant="h6">Ready?</Typography>
            </Fade>
            <Link to="/influence-a-follower">
                <IconButton icon="tick" text="Yes" onClick={this.clearTimer}/>
            </Link>
        </div>
        <Modal
          isOpen={this.state.modalOpen}
          title={this.modalTitle}
          content={this.modalContent}
          onClose={() => this.closeModal()}
        />
        <FooterLogo />
    </div>
    );
  }
}

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
};
Steps.contextType = UserSession;

export default withStyles(styles)(Steps);
