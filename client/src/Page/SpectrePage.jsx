import React from 'react';
import PropTypes from 'prop-types';

// Allows navigation via left/right arrows for dev
class SpectrePage extends React.Component {

  constructor(props, next) {
    super(props);
    this.nextPage = next;
  }

  componentDidMount() {
    document.addEventListener('keyup', this.navigate);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.navigate);
  }

  navigate = (e) => {
    console.log('SP.navigate', e);
    switch (e.keyCode) {
      case 39: // RIGHT_ARROW
        this.next();
        break;
      case 37: // LEFT_ARROW
        this.last();
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
