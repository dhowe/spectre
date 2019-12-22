import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import { ReactComponent as ThumbUp } from '../../Icons/insightthankyou.svg';

import colours from '../../colors.scss';
import './InsightThankYou.scss';
import Styles from '../../Styles';
import SpectrePage from '../SpectrePage';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  twoMore: {
    margin: 80,
  },
  beginningToThink: {
    margin: 0,
  },
  button: {
    ...Styles.button,
    border: `solid 3px ${colours.blue}`,
    color: colours.blue,
    fontSize: 18,
  },
  title: {
    color: colours.blue,

  },
};

class InsightThankYou extends SpectrePage {
  constructor(props) {
    super(props, '/insight-sexuality');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <div className={`${classes.content} content`}>
          <Typography className="title" component="h3" variant="h3">Great!</Typography>
          <ThumbUp className="insight-thank-you-icon" />
          <Typography style={styles.beginningToThink} component="h6" variant="h6">Now you are beginning to think like an algorithm.</Typography>
          <Typography style={styles.twoMore} component="h6" variant="h6">Just two more to go</Typography>
          <Button className={classes.button} variant="contained" color="primary" onClick={this.next}>Lets go deeper!</Button>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InsightThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
InsightThankYou.contextType = UserSession;


export default withStyles(styles)(InsightThankYou);
