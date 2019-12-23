import React from 'react';
import Modal from '../Modal/Modal';

class IdleChecker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //timout checker
      idleTimer: 0,
      resetTimer: 5,
      isIdle: false,
      //modal
      modalOpen: false,
      idleTime : 10,
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

  handleIdle() {

//    if (this.props.forceTerminate) {
  //    console.log("cleared idle checker : " + this.props.forceTerminate);
      //document.removeEventListener('click', this.detectClick);
//      clearInterval(this.interval);
//    }
    let timer = this.state.idleTimer;
    console.log(timer);
    var t = this.props.setIdleTime === undefined ? this.state.idleTime : this.props.setIdleTime;
    if (timer >   t ) {
      this.setState({
        isIdle: true
      });
    } else {
      if (!this.props.forceTerminate) {
      let t = this.state.idleTimer + 1;
      this.setState({
        idleTimer: t
      });
    }
    }
    if (this.state.isIdle) {
      this.modalTitle = this.state.resetTimer + '';
      this.modalContent = 'Are you still here?';
      this.setState({
        modalOpen: true
      });

      let t = this.state.resetTimer - 1;
      this.setState({
        resetTimer: t
      });
    }
    if (this.state.resetTimer <= -1) {
      window.open("/", "_self");
    }
  }

  detectClick() {

  //  if (!this.props.forceTerminate) {

    this.setState({
      idleTimer: 0
    });
    this.setState({
      isIdle: false
    });
    this.setState({
      resetTimer: 5
    });

    if (this.modalContent.includes('Are you still here?') && this.state.modalOpen) {
      this.closeModal();
    }
    //  }
  //  console.log(this.interval)

  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
    //style={'background:white; opacity:0; filter:Alpha(opacity=0);'}
  }

  render() {
    return ( <div >
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
