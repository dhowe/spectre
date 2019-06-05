import React from 'react';
import PropTypes from 'prop-types';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

class NavigationHack extends React.Component {
  constructor(props, next = '/') {
    super(props);

    this.navigateTo = next;
    this.navigate = this.navigate.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.navigate);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.navigate);
  }

  navigate(event) {
    //console.log('touched', event.keyCode);
    switch (event.keyCode) {
    case LEFT_ARROW:
      this.previous();
      break;
    case RIGHT_ARROW:
      this.next();
      break;
    default:
      break;
    }
  }

  previous() {
    const { history } = this.props;

    history.goBack();
  }

  next() {
    const { history } = this.props;

    history.push(this.navigateTo);
  }
}

NavigationHack.propTypes = {
  history: PropTypes.object.isRequired,
  next: PropTypes.string.isRequired,
};

export default NavigationHack;
