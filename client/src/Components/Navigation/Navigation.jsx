import React from 'react';
import UserSession from '../../Components/UserSession/UserSession';
import { withRouter } from 'react-router-dom';

const routes = [
  '/', '/login', '/pledge', '/searching', '/data-is', '/personalised',
  '/game', '/thank-you', '/steps', '/follower', '/selected',
  '/insight-gender','/insight-skin', '/insight-financial', '/insight-thank-you',
  '/insight-sexuality', '/insight-political', '/insight-complete',
  '/your-power', '/pick-your-side', '/campaign', '/dark-ad',
  '/success-ad', '/influence-a-nation', '/consumer-data', '/political-data',
  '/home-data', '/find-citizens', '/targets-found', '/launch-campaign',
  '/campaign-results', '/win', '/influence-a-celebrity', '/OCEAN-reveal',
  '/take-back-control', '/goodbye'
];

const disabled = [ '/login', '/pledge', '/selfie'/* last 2 for webcam */];

class Navigation extends React.Component {

  next = (page) => {
    //console.log('Navigation.next');
    let current = window.location.pathname;
    if (!disabled.includes(current)) {
      let idx = routes.indexOf(current);
      page = page || routes[++idx % routes.length];
      this.props.history.push(page);
    }
  }

  last = () => {
    if (this.enabled) this.props.history.goBack();
  }

  onKey = (e) => {
    //console.log('onKey:'+e.keyCode);
    if (e.keyCode === 39) this.next(); // ->
    if (e.keyCode === 37) this.last(); // <-
    if (e.keyCode === 67) {            // c
      UserSession.clear();
      window.location.reload();
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKey);
  }

  render() {
    let page = window.location.pathname;

    // store the page/update-time with the user
    this.context.logVisit(page);
    if (page.length > 1) page = page.replace(/^\//, '');
    if (typeof this.context._id !== 'undefined') {
      console.log(('[' + page.substring(0, 6) + '] ')
        .toUpperCase() + this.context.toString());
    }
    return null;
  }
}

Navigation.contextType = UserSession;

export default withRouter(Navigation);
