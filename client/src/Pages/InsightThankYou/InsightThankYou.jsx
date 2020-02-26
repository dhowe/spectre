import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import { ReactComponent as ThumbUp } from '../../Icons/insightthankyou.svg';

import './InsightThankYou.scss';
import ComponentsStyles from '../../App.module.css';

const styles = {};

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
          <div>
            <h1><span>Great!</span></h1>
            <ThumbUp className="thankyou-icon" />
            <p className="normal-addSpacing">Now you are beginning to think like an algorithm.</p>
            <p className="normal-addSpacing">Just two more to go.</p>
          </div>
          <div className="insight-thankyou-link">
            <Link to="/insight-sexuality">
              <IconButton enabled={true} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Let's go deeper" />
            </Link>

          </div>
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
