import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({

});

// Q: shouldn't mention of gender/female be in the page, not the component ?
// otherwise it should probably be called GenderInput
class RadioButtonsGroup extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <Typography variant="h6">{this.props.children}</Typography>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <RadioGroup
            aria-label="Gender"
            name="gender"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.props.options.map(function (option, index) {
              return <FormControlLabel key={index} value={option} control={<Radio color="primary" />} label={option} />
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
