import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Game from '../Game/Game';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import "./PersonalisedExperience.scss";

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

class PersonalisedExperience extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + ' PersonalisedExperience'}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h3" variant="h3">Excellent</Typography>
          <Typography component="h3" variant="h3">In order to create a <strong>personalised experience</strong></Typography>
          <Typography component="h4" variant="h4" >tell us what you love, tell us what you hate...</Typography>
          <Link component={Game} to="/game">
            <IconButton icon="next" text="Next" />
          </Link>
        </div >
        <FooterLogo />
      </div>
    );
  }
}

PersonalisedExperience.propTypes = {
  classes: PropTypes.object.isRequired,
};

PersonalisedExperience.contextType = UserSession;

export default withStyles(styles)(PersonalisedExperience);
