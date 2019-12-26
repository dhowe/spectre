import React from 'react';
import PropTypes from 'prop-types';

// Allows navigation via left/right arrows for dev
class SpectrePage extends React.Component {

  constructor(props, next, onNext, onPrev) {
    super(props);
    this.enabled = !!(next || onNext || onPrev);
    this.onForward = (onNext || this.next).bind(this);
    this.onBackward = (onPrev || this.last).bind(this);
    this.nextPage = next;
    document.addEventListener('keyup', this.navigate);
  }

  navigate = (event) => {
    switch (event.keyCode) {
      case 39: // RIGHT_ARROW
        this.onForward();
        break;
      case 37: // LEFT_ARROW
        this.onBackward();
        break;
      default:
    }
  }

  last = () => {
    this.props.history.goBack();
  }

  next = () => {

    //console.log('next', this.props.location.pathname, this.context);

    // track the last page visited and time
    if (typeof this.context.lastPageVisit !== 'undefined') {
      let pageName = this.nextPage.replace(/^\//,'');
      this.context.lastPageVisit = { page: pageName, time: Date.now() }
      //console.log('[Page]', pageName);
    }
    this.props.history.push(this.nextPage);
  }
}

SpectrePage.propTypes = {
  history: PropTypes.object.isRequired,
  next: PropTypes.string.isRequired,
};

export default SpectrePage;
