import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ReactComponent as ThumbUp } from '../../Icons/insightthankyou.svg';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
//import ComponentsStyles from '../../App.module.css';

const styles = {

};

// Interstitial
class ThankYou extends React.Component {
  constructor(props) {
    super(props, '/steps');
  }

  render() {
    const user = UserSession.validate(this.context, ['name', 'login', 'gender']);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <div>
            <p className="copy">Thank you, <strong>{user.name}!</strong></p>
            <ThumbUp className="thankyou-icon" />
            <p className="copy">Your experience has been <strong>personalised.</strong></p>
          </div>
          <div className="link">
          <Link to="/steps">
            <IconButton enabled={true} icon="next" text="Next"/>
          </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};
ThankYou.contextType = UserSession;

export default withStyles(styles)(ThankYou);
