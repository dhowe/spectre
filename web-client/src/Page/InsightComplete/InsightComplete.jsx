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
              <Typography component="h3" variant="h3">Congratulations {this.context.name} </Typography>
              <Typography component="h3" variant="h4">Verification complete. </Typography>
              <IconButton icon="thumbup" />
              <Typography component="h6" variant="h6">You've unlocked {this.props.selectedFollower.name}’s OCEAN profile. Our new behavioural products can create {this.context.virtueAsAdverb()} insights</Typography>
              <Typography component="h6" variant="h6">You now have the <strong>power</strong> to influence {this.props.selectedFollower.name}</Typography>
              <Link to="/intro-ocean-video">
                  <IconButton icon="next" text="WTF is OCEAN?" />
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
