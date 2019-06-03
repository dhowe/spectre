import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "../IconButton/IconButton";

import "./IconButton.scss";

const styles = {};

class IconButtonToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {condition: false};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      condition: !this.state.condition
    });
  }

  render () {
    return (
    <a onClick={ this.handleClick } className={this.state.condition ? "iconEnabled" : "iconDisabled"}>
      <IconButton enabled={this.state.condition} icon={this.props.icon} text={this.props.text}></IconButton>
    </a>
    );
  }
}

IconButtonToggle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconButtonToggle);
