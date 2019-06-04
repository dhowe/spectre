import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  image: {
    height: '500px',
    width: '440px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class TargetsFound extends React.Component {
  onComplete() {
    window.location.assign('/launch-campaign');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <div className={classes.content + " content"}>
          <Typography component="h4" variant="h4">[Video Animation #1]</Typography>
          <Video autoPlay movie="/video/TargetsFound_animation.mp4" onComplete={this.onComplete()} />
          <Typography component="h6" variant="h6">Consumer..... Political........ Home........</Typography>
          <img className={classes.image} src="https://i.gyazo.com/2a4d9f74959da191656459877bb60d57.png" alt="targets" onClick={() => { this.context.adIssue = 'remain' }} />
          <Typography component="h3" variant="h3">Targets found: [1,095,405 ]</Typography>
          <Link to="/referendum-results">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

TargetsFound.propTypes = {
  classes: PropTypes.object.isRequired,
};
TargetsFound.contextType = UserSession;

export default withStyles(styles)(TargetsFound);
