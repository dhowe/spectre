import React from 'react';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  content: {
    fontSize: '.5rem',
    fontWeight: 400,
    display: 'inline-block',
    width: 600,
    marginTop: 475,
    marginBottom: 75,
  },
  label: {
    color: 'black',
    margin: 10
  },
  input: {
    color: 'black !important',
    width: 200 + 'px !important',
    margin: 10
  },
};

class MessageForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      uid: '',
      focus: 'uid'
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const uid = document.getElementById('uid').value;
    const email = document.getElementById('email').value;
    if (uid && uid.length && this.emailIsValid(email)) {
      this.sendMail(uid, email);
    }
    else {
      alert('A valid user-id is required');
    }
  }

  sendMail = async (uid, email) => {
    try {
      console.log('[SENDMAIL] ' + uid + ' ' + email);
      let resp = await UserSession.sendMail(uid, email);
      alert(resp);
    }
    catch (e) {
      console.error('UserSession.sendMail: ', e);
    }
  }

  emailIsValid = (addr) => {
    if (!addr || !addr.length) return true;
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(addr.toLowerCase());
  }

  render() {
    const { classes } = this.props;
    return (
      <div >
        <SpectreHeader colour="white" />
        <div className={classes.content}>
          <form onSubmit={this.handleSubmit} noValidate>
            <span className={classes.label}>User Id:</span>&nbsp;<input id="uid" className={classes.input} name="uid" type="text" /><br />
            <span className={classes.label}>Email:</span>&nbsp;<input id="email" className={classes.input} name="email" type="text" /><br />
            <button>Send</button>
          </form>
        </div>
        <FooterLogo />
      </div>
    );
  }
}
export default withStyles(styles)(MessageForm);
//export default MessageForm;
