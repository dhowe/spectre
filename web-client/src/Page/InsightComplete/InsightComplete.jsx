import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

class InsightComplete extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h3" variant="h4">Verification complete. </Typography>
              <Typography component="h6" variant="h6">You've unlocked {this.context.targetName}’s OCEAN profile.</Typography>
              {/* INSERT OCEAN TOPBAR COMPONENT HERE (1080x450)*/}
              <Typography component="h6" variant="h6">You now have the <strong>power</strong> to influence {this.context.targetName}.</Typography>
              <Link to="/your-power">
                  <IconButton icon="next" text="Next" />
              </Link>
          </div>
          <FooterLogo />
      </div >
    );
  }
}

InsightComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};
InsightComplete.contextType = UserSession;

export default withStyles(styles)(InsightComplete);
