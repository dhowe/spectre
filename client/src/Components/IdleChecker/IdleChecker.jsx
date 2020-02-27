import React from 'react';
import Modal from '../Modal/Modal';

const MODAL_TEXT = 'Are you still there?';

class IdleChecker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idleTimer: 0,
      resetTimer: 15, // dialog countdown
      idleTime: 90, // time before dialog
      isIdle: false,
      modalOpen: false
    }
    this.interval = -1;
    this.modalTitle = '';
    this.modalContent = '';
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') { // DONT REMOVE
      if (!/game$/.test(window.location.pathname)) { // not in Game
        this.interval = setInterval(this.handleIdle, 1000);
        document.addEventListener('click', this.detectClick);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.detectClick);
    clearInterval(this.interval);
  }

  handleIdle = () => {
    let timer = this.state.idleTimer;
    let t = typeof this.props.setIdleTime === 'undefined' ?
      this.state.idleTime : this.props.setIdleTime;

    if (timer > t) {
      this.setState({
        isIdle: true
      });
    }
    else {
      if (!this.props.forceTerminate) {
        let t = this.state.idleTimer + 1;
        this.setState({
          idleTimer: t
        });
      }
    }

    if (this.state.isIdle) {
      this.modalTitle = this.state.resetTimer + '';
      this.modalContent = MODAL_TEXT;
      let t = this.state.resetTimer - 1;
      this.setState({ resetTimer: t, modalOpen: true });
    }

    if (this.state.resetTimer <= -1) {
      window.open("/", "_self");
    }
  }

  detectClick = () => {
    this.setState({
      idleTimer: 0,
      isIdle: false,
      resetTimer: 5
    });

    if (this.modalContent.includes(MODAL_TEXT) && this.state.modalOpen) {
      this.closeModal();
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  render() {
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
