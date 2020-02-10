import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class LaunchCampaign extends React.Component {
  constructor(props) {
    super(props, '/referendum-results');
  }

  render() {
    const { classes } = this.props;
    const launchImg = `/imgs/vote-${(this.context.adIssue || 'remain')}.png`;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p className="smallText">Launch Campaign!</p>
          <div className="link">
          <Link to="/referendum-results">
            <img
              className={classes.image}
              src={launchImg}
              alt="launch campaign"
            />
          </Link>
          </div>
          <div className="link">
          <Link to="/referendum-results">
              <IconButton className={ComponentsStyles.iconButtonStyle1} icon="next" text="Go" />
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
