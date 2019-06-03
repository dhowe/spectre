import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';

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

class ReferendumResults extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white"/>
        <div className={classes.content + ' content'}>
          <Video
            autoPlay
            movie="/video/ReferendumResults_animation.mp4"
            onComplete={() => window.location.assign('/win')}
          />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

ReferendumResults.propTypes = {
  classes: PropTypes.object.isRequired,
};
ReferendumResults.contextType = UserSession;

export default withStyles(styles)(ReferendumResults);
