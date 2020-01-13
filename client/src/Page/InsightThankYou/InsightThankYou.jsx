import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import { ReactComponent as ThumbUp } from '../../Icons/insightthankyou.svg';

//import colours from '../../colors.scss';
import './InsightThankYou.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {

};

class InsightThankYou extends React.Component {

  constructor(props) {
    super(props, '/insight-sexuality');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1>Great!</h1>
          <ThumbUp className="insight-thank-you-icon" />
          <p className="copy">Now you are beginning to think like an algorithm.</p>
          <p className="copy">Just two more to go</p>
          <Button className={ComponentsStyles.blueBtn} onClick={()=>this.props.history.push('/insight-sexuality')}>
            Lets go deeper!
          </Button>
        </div>
        <FooterLogo/>
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
