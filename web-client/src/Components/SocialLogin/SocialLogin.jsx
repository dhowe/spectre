import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UserSession from '../../Components/UserSession/UserSession';

import grey from '@material-ui/core/colors/grey';
import './SocialLogin.scss';

const styles = {
  textField: {
    width: 300,
    color: grey[50],
    '&:before': {
      borderColor: grey[50],
    },
  },
  cssLabel: {
    color: grey[50],
    '&$cssFocused': {
      color: grey[50],
    },
  },
  cssFocused: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssOutlinedInput: {
    // TMP: removed to silence warning in console
    // '&$cssFocused $notchedOutline': {
    //   borderColor: grey[50],
    // }
  }
};

class SocialLogin extends React.Component {
  handleChange = login => event => {
    this.context.login = event.target.value; // user-prop
  }
  render() {
    return (
      <div className={this.props.classes.root + " socialLogin"}>
        <div className={this.props.classes.content + " socialLogin-content"}>
          <form onSubmit={this.props.handleSubmit}>
            <FormControl className={this.props.classes.margin}>
              <InputLabel
                classes={{
                  root: this.props.classes.cssLabel,
                  focused: this.props.classes.cssFocused
                }}><br />Email:
                  </InputLabel>
              <Input
                name='email'
                id="custom-css-standard-input"
                onChange={this.handleChange('name')}
                classes={{
                  root: this.props.classes.textField,
                  underline: this.props.classes.cssUnderline
                }} /><br />
            </FormControl>
          </form>
        </div >
      </div>
    );
  }
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
SocialLogin.contextType = UserSession;

export default withStyles(styles)(SocialLogin);
