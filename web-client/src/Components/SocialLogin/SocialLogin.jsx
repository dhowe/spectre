import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
    '&$cssFocused $notchedOutline': {
      borderColor: grey[50],
    }
  }
};

class SocialLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  validateForm(e) {
    // Do email validation here...
    return true;
  }

  render() {
    return (
      <div className={this.props.classes.root + " socialLogin"}>
          <div className={this.props.classes.content + " socialLogin-content"}>
            <form onSubmit = { this.props.handleSubmit }>
              <FormControl className={this.props.classes.margin}>
                  <InputLabel
                  classes={{
                      root: this.props.classes.cssLabel,
                      focused: this.props.classes.cssFocused
                  }}
                  >
                  </InputLabel>
                  Name:<Input
                  name='name'
                  id="custom-css-standard-input"
                  classes={{
                      root: this.props.classes.textField,
                      underline: this.props.classes.cssUnderline
                  }}
                  />
                  <br/>Email:<Input
                  name='email'
                  id="custom-css-standard-input"
                  classes={{
                      root: this.props.classes.textField,
                      underline: this.props.classes.cssUnderline
                  }}
                  />
                  <br/>
                  <Button disabled={!this.validateForm() } type="submit">
                  Go
                  </Button>
              </FormControl>
            </form>
          </div >
      </div>
    );
  }
}
/*
function SocialLogin(props) { // requires props.handleSubmit
  //const { handleSubmit, classes } = props;
  //console.log("PROPS",props);
  return (
    <div className={props.classes.root + " socialLogin"}>
        <div className={props.classes.content + " socialLogin-content"}>
          <form onSubmit = { props.handleSubmit }>
            <FormControl className={props.classes.margin}>
                <InputLabel
                classes={{
                    root: props.classes.cssLabel,
                    focused: props.classes.cssFocused
                }}
                >
                Login via social media or email
                </InputLabel>
                <Input
                id="custom-css-standard-input"
                classes={{
                    root: props.classes.textField,
                    underline: props.classes.cssUnderline
                }}
                value={state.email} onChange={onEmailChange}
                />
                <Button disabled={!validateForm() } type="submit">
                Go
                </Button>
            </FormControl>
          </form>
        </div >
    </div>
  );
}*/

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocialLogin);
