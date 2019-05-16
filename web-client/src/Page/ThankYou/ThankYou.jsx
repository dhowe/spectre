import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InfluenceAFollower from '../InfluenceAFollower/InfluenceAFollower';
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
  clickToContinue: {
    margin: "20% 0",
  },
  glow: {
    color: '#ffd700'
  }
};

class ThankYou extends React.Component {
  render() {
    const { classes } = this.props;
    console.log("User:", this.context);
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h3" variant="h3">Thank you, {this.context.name}!</Typography>
          {/* <img src='https://cdn.pixabay.com/photo/2013/07/13/12/15/hand-159474__340.png' alt='thumbs up'></img> */}
          <Typography component="h4" variant="h4" >Your experience has been personalised.</Typography>
          <Link component={InfluenceAFollower} to="/influence-a-follower">
            <IconButton icon="next" text="Next" />
          </Link>
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
