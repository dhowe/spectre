import React from 'react';
import Modal from '../Modal/Modal';

class IdleChecker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //modal
    //  modalOpen: false,
      //timout checker
      idleTimer : 0,
      resetTimer : 5,
      isIdle : false,
      //modal
      modalOpen: false,
    }

    //modal
    this.modalContent = '';
    this.modalTitle = '';

    this.handleIdle = this.handleIdle.bind(this);
    this.detectClick = this.detectClick.bind(this);
    this.interval = '';
  }

  componentDidMount() {
    this.interval = setInterval(this.handleIdle, 1000);
    document.addEventListener('click', this.detectClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.detectClick);
    clearInterval(this.interval);
  }

  handleIdle(){

    if(this.props.clicked){
      console.log("cleared idle checker : " + this.props.clicked);
      document.removeEventListener('click', this.detectClick);
      clearInterval(this.interval);
    }
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

  closeModal() {
    this.setState({ modalOpen: false });
    //style={'background:white; opacity:0; filter:Alpha(opacity=0);'}
  }





  render () {
    return (
     <div >
     <Modal
       isOpen={this.state.modalOpen}
       title={this.modalTitle}
       content={this.modalContent}
       onClose={() => this.closeModal()}
     />
      </div>
    )
  }
};

export default IdleChecker;
