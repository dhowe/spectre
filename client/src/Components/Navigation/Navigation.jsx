import React from 'react';
import UserSession from '../../Components/UserSession/UserSession';
import { withRouter } from 'react-router-dom';

const routes = [
  "/", "/login", "/pledge", "/searching-for", "/data-is",
  "/personalised-experience", "/game", "/thank-you", "/steps",
  "/influence-a-follower", "/selected-avatar"
];

const disabled = ["/login"];

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.enabled = true;
  }

  next = (page) => {

    let current = window.location.pathname;
    if (!disabled.includes(current)) {
      let idx = routes.indexOf(current);
      page = page || routes[++idx];
      //console.log('nav: '+current+' -> '+page);
      this.props.history.push(page);
    }
  }

  last = () => {
    if (this.enabled) this.props.history.goBack();
  }

  onKey = (e) => {
    if (this.enabled && e.keyCode === 39) this.next();
    if (this.enabled && e.keyCode === 37) this.last();
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKey);
  }

  render() {

    this.context.lastPageVisit = {
      page: window.location.pathname.replace(/^\/(.*)/, '$1'),
      time: Date.now()
    };
    if (typeof this.context._id !== 'undefined') {
      console.log(('[' + window.location.pathname.substring(0, 7)
        + '] ').toUpperCase() + this.context.toString());
    }
    return null;
  }
}

Navigation.contextType = UserSession;

export default withRouter(Navigation);
