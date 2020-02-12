import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
//import IconButton from '../../Components/IconButton/IconButton';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
//import ComponentsStyles from '../../App.module.css';

const styles = {

};

class LaunchCampaign extends React.Component {
  constructor(props) {
    super(props, '/campaign-results');
  }

  render() {
    const { classes } = this.props;
    const launchImg = `/imgs/vote-${(this.context.adIssue || 'remain')}.png`;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1 className="addSpacing"><span>Launch the campaign!</span></h1>
          <h2>Keep America Great!</h2>
          <div className="link">
            <Link to="/campaign-results">
              <div className="pickLink">
                <div className="RepublicanLogo">
                  <img
                    className={classes.image}
                    src={launchImg}
                    alt="launch campaign"
                  />
                  <h2><span>Republican</span></h2>
                </div>
              </div>

            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

LaunchCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
};
LaunchCampaign.contextType = UserSession;

export default withStyles(styles)(LaunchCampaign);
