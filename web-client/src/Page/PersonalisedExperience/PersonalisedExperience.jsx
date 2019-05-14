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
  componentDidMount() {
    this.context.name = 'Daniel';
    this.context.gender = 'male';
    this.context.login = 'daniel@rednoise.org';
    this.context.loginType = 'email';
    console.log(this.context);
  }
  render() {
    let classes = this.props.classes;
    return (
      <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Excellent</Typography>
                <Typography component="h3" variant="h3">In order to create your</Typography>
                <Typography component="h3" variant="h3" className={classes.glow}><strong>personalised experience</strong></Typography>
                <Typography component="h4" variant="h4" >Tell us what you love, tell us what you hate...</Typography>
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
