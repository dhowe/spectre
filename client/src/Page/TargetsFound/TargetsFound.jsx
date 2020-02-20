import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';
import ComponentsStyles from '../../App.module.css';

const styles = {};

class TargetsFound extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="two" />
        <div className={`${classes.content} content`}>
          <Video className={ComponentsStyles.inPageVideo} autoPlay
            movie={`${UserSession.publicUrl}video/TargetsFound_US.mp4`}
            onComplete={() => this.context.goto(this.props, '/launch-campaign')} />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

TargetsFound.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
TargetsFound.contextType = UserSession;

export default withStyles(styles)(TargetsFound);
