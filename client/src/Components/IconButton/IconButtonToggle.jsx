import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '../IconButton/IconButton';
import './IconButton.scss';

const styles = {};

class IconButtonToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEnabled: false };
  }

  handleClick = () => {
    this.setState({ isEnabled: !this.state.isEnabled });
  }

  render() {
    return (
      <IconButton
        enabled={true}
        onClick={this.handleClick}
        className={this.state.isEnabled ? 'iconEnabled' : 'iconDisabled'}
        icon={this.props.icon}
        text={this.props.text}
      />
    );
  }
}

IconButtonToggle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtonToggle);
